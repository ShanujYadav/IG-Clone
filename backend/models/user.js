// const { ObjectId} = require('bson')
const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const userScheema=new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    pic:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1669930763060-799cb8e82293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    following :[{
        type :ObjectId,
        ref: 'User' 
    }] 
})

module.exports =mongoose.model('User',userScheema)