const mongoose = require('mongoose');


const appliancesSchema = mongoose.Schema({
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

let applianceModel = mongoose.model("appliances", appliancesSchema)

module.exports = { applianceModel }