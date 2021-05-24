// importing Mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passport = require('passport')

// creating user schema
let userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: String,
        enum: [0, 1],
        default: 0
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
    emailToken: [{
        type: String
    }],

    password: {
        type: String
    }

}, {
    collection: "users"
});

// Create model from the order schema
const users = mongoose.model("users", userSchema);

// exporting user module
module.exports = users;