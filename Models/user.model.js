const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    mobile_No: Number,
    password: String,
    age : Number,
    // image:{
    //     data:Buffer,
    //     contentType:String
    // }

},{
    versionKey : false
})

let userModel = mongoose.model("user",userSchema)

module.exports = {userModel}