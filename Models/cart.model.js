const mongoose = require("mongoose")

//note schema
const noteSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    Fashions: [
        {
            data: { type: mongoose.Schema.Types.ObjectId, ref: "Fashion" },
            Quantity: { type: Number, default: 1, min: 1 }
        }


    ],
    electronics: [
        {
            data: {
                type: mongoose.Schema.Types.ObjectId, ref: "electronics"
            },
            Quantity: { type: Number, default: 1, min: 1 }
        }
    ],
    appliances: [
        {
            data: {
                type: mongoose.Schema.Types.ObjectId, ref: "appliances"
            },
            Quantity: { type: Number, default: 1, min: 1 }
        }
    ]

})

const cartModel = mongoose.model("cart", noteSchema)

module.exports = {
    cartModel
}



// const mongoose = require('mongoose');

// const CartSchema = mongoose.Schema({
//     userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//     jeans: [
//         {
//             data: { type: mongoose.Schema.Types.ObjectId, ref: "jean" },
//             Quantity: { type: Number, default: 1, min: 1 }
//         }


//     ],
//     tops: [
//         {
//             data: {
//                 type: mongoose.Schema.Types.ObjectId, ref: "top"
//             },
//             Quantity: { type: Number, default: 1, min: 1 }
//         }
//     ],
//     shoes: [
//         {
//             data: {
//                 type: mongoose.Schema.Types.ObjectId, ref: "shoe"
//             },
//             Quantity: { type: Number, default: 1, min: 1 }
//         }
//     ]

// })


// const CartModel = mongoose.model("cart", CartSchema)

// module.exports = CartModel