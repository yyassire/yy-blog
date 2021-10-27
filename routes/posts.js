const route = require("express").Router()
const bcrypt =require("bcrypt")
const User = require("../models/User")
const Post = require("../models/Post")
const jwt = require("jsonwebtoken")
const verify = require("../verify")

// create post
route.post("/",async(req,res)=>{
    try {
        const post = new Post(req.body)
    const savedPost =await post.save()
    res.status(200).send(savedPost)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})
// update post
route.put("/:id",verify,async(req,res)=>{
    const post = await Post.findById(req.params.id) 
    if(post.username === req.user.username){
        
        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).send(updatedPost)
            
        } catch (error) {
            res.status(500).send(error)
            
        }

    }else{res.status(404).send("you can not update this post")}
        

})
// delete post
route.delete("/:id",verify,async(req,res)=>{
  const post = await Post.findById(req.params.id) 
    if(post.username === req.user.username){
        
    try {
    //  await Post.findByIdAndDelete(req.params.id)
    post.delete()
    res.status(200).send("deleted succesfylly")
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}else{res.status(404).send("you can not delete this post")}
  
})
// get a post 
route.get("/single/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
      res.status(200).send(post)

        
    } catch (error) {
        res.status(500).send(error)
        
    }
})
// get all post
route.get("/all", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          category: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      
      res.status(200).json(posts.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = route
