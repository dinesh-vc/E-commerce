const user = require("../models/product.model");
require('dotenv').config();
const jwt = require("jsonwebtoken")
const config = require('../../config/config')
const fs = require('fs')

const mail = require('../../utils/email')
// Import Bycrpt module for password hasing
const bcrypt = require('bcrypt');
const products = require("../models/product.model");
const users=require("../models/user.model")

// Adding New Product

exports.addProduct = async (req, res) => {

    try {
        
        let userId= req.body.userId;
        let userInfo = await users.findOne({
            _id : userId
        })

        if ( userInfo.userType == 'Vendor'){

            const newProduct = new products({
                addedBy: userId,
                productImage: req.body.productImg,
                productName: req.body.productName,
                productQuantity: req.body.productQuantity,
                price: req.body.price,
    
            })
            const addingProduct = await newProduct.save();

            let productInfo = await products.findOne({
                addedBy : userId , productName : req.body.productName
            })

            res.json({
                message : `${userInfo.name} added ${req.body.productName} Succesfully`,
                productDetail : {
                    productName : productInfo.productName,
                    productQuantity : productInfo.productQuantity,
                    productImage : productInfo.productImage
                }
            })

        } else {

            res.send("Please Register As Vendor")
        }

        



    } catch (error) {
        console.log(error)
    }
}

exports.demo = async(req, res) => {
console.log(req.body.name)
    res.send(req.body.name)
}