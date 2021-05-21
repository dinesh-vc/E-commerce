// importing Mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating product schema

let productSchema = new Schema({

    productName: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    productImage : {
        productImgPath: {
            type: String,
        }
    },
    
    isDelete : {
        type: String,
        enum: [0, 1],
        default: 0
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
}, {
    collection: "products"
});

// Create model from the product schema
const products = mongoose.model("products", productSchema);
// exporting product module
module.exports = products;

