const mongoose = require('mongoose')

const Schema = mongoose.Schema
const users = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false 
    },
    phone:{
        type:String,
        required:false    
    },
    password:{
        type:String,
        required:false  
    },
    
   
})
module.exports =mongoose.model('users',users)