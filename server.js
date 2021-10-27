const express = require("express")
const mongoose = require("mongoose")
const UserAuthRoute = require("./routes/Auth")
const PostRoute = require("./routes/posts")
require('dotenv').config()
const UserRoute = require("./routes/users")
const path = require("path")

const app = express()
app.use(express.json());
app.use("/api/auth",UserAuthRoute)
app.use("/api/user",UserRoute)
app.use("/api/post",PostRoute)


// variable
const port = process.env.PORT || 8800
const db = process.env.DB;

mongoose.connect(db).then(()=>{console.log("the server is connected to the db")}).catch(err=>console.log(err))

// midleware
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"/client/build"))); 
//     app.get('*', (req,res)=>{
//         res.sendFile(path.join(__dirname, "client","build","index.html"))
//     })
    
// } else{
//     app.get("/",(req,res)=>{
//         res.send("Api running")
//     })
// }



if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
  //   res.sendFile('client/build/index.html' , { root : __dirname})
  //   console.log(path.join(__dirname, "/client/build","index.html"))
  });
    
} else{
    app.get("/",(req,res)=>{
        res.send("Api running")
    })
}


app.listen(port,()=>{console.log("server up and running")})