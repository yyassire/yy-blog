const mongoose = require("mongoose")

 const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true

    },
    photo:{
        type:String,
    },
    username:{
        type:String,
        required:true
    },
    category:{
    type:Array,
    required:true
    }
 },{timestamps:true})



module.exports = mongoose.model("posts",postSchema)