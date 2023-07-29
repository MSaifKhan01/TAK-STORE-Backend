const mongoose = require('mongoose');


const FashionSchema = mongoose.Schema({
    descriptioin: String,
    image: String,
    hidden_stars: Number,
    new_price: Number,
    size: String,
    quantity: Number,
    userID: String

}, {
    versionKey: false
})

let FashionModel = mongoose.model("Fashion", FashionSchema)

module.exports = { FashionModel }