const mongoose = require('mongoose');


const electronicsSchema = mongoose.Schema({
    descriptioin: String,
    image: String,
    stars: Number,
    new_price: Number,
    size: String,
    // qty:Number,
    userID: String

}, {
    versionKey: false
})

let electronicsModel = mongoose.model("electronics", electronicsSchema)

module.exports = { electronicsModel }