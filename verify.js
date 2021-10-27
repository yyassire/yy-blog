const jwt = require("jsonwebtoken")


// verify token
const verify = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
       let myToken = authHeader.split(" ")[1]
       jwt.verify(myToken, process.env.KEY,(err,payload)=>{
           if(err){ return res.status(403).json("your token is not authentified")}
          req.user= payload;
            next()
       });
    }else{
        res.status(403).send("you did not provide a token")
    }
}

module.exports = verify 