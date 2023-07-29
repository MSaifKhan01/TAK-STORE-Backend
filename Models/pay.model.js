const mongoose = require('mongoose');


const paySchema = mongoose.Schema({
   name:String,
   Mobile:Number,
   City:String,
   Pin:Number,
 payment:String,
 status:String,
    userID: String

}, {
    versionKey: false
})

let payModel = mongoose.model("payment", paySchema)

module.exports = { payModel }