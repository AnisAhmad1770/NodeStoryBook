const mongoose = require("mongoose")

const StorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    cody:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'public',
        enum:['public','private']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    createdAt:
    {
        type:Date,
        defeult:Date.now
    }
})

module.exports=mongoose.model('Story',StorySchema)