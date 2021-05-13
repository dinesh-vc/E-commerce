// importing Mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating user schema
let userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    userType: {
        type: String
    },

    token: [{
        type: String
    }],
    OTP: [{
        type: String
    }],
    password: {
        type: String,
        required: true
    }

}, {
    collection: "users"
});

// Create model from the order schema
const users = mongoose.model("users", userSchema);

// exporting user module
module.exports = users;