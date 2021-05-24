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
        
        const token = req.headers["authorization"];
         const {email }= jwt.decode(token)
        let userInfo = await users.findOne({email : email})

        if ( userInfo.userType == 'Vendor'){

            const newProduct = new products({
                addedBy: userInfo._id,
                productName: req.body.productName,
                productQuantity: req.body.productQuantity,
                productPrice: req.body.productPrice,
    
            })

            const addingProduct = await newProduct.save();

            let files= req.files;
           files.forEach( async element => {
            var productImages = await products.updateOne({ _id: addingProduct._id }, {$push: {productImage: element.path} });

            });

            let productInfo = await products.findOne({
                addedBy : userInfo._id , productName : req.body.productName
            })

            res.json({
                message : `${req.body.productName} Succesfully`,
                productDetail : productInfo
            })

        } else {

            res.send("Please Register As Vendor")
        }

    } catch (error) {
        console.log(error)
    }
}

exports.editProduct= async (req, res) =>{

    const token = req.headers["authorization"];
    const {email }= jwt.decode(token)
    let userInfo = await users.findOne({email : email})

    if ( userInfo.userType == 'Vendor'){

        const productId= req.body.productId
        let productInfo = await products.findOne({
            _id: productId
        });
        res.json({
            message : `${productInfo.productName} for edit`,
            productDetail : productInfo
        })
    }else {
        res.send("Please Register As Vendor")
    }
   
}

exports.addEditProduct= async (req, res) =>{
    const token = req.headers["authorization"];
    const {email }= jwt.decode(token)
    let userInfo = await users.findOne({email : email})

    if ( userInfo.userType == 'Vendor'){
        const productId= req.body.productId;
    let updateProduct = await products.updateOne({_id: productId}, {
        $set: {
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity
        }
    })

    let productInfo = await products.findOne({
        _id: productId
    });
   
    res.json({
        message : `${productInfo.productName} Edited Succesfully`,
        productDetail : productInfo
    })
    }else {
        res.send("Please Register As Vendor")
    }
    
}

exports.deleteProduct= async (req , res) =>{
    const token = req.headers["authorization"];
    const {email }= jwt.decode(token)
    let userInfo = await users.findOne({email : email})

    if ( userInfo.userType == 'Vendor'){ 
        const productId= req.body.productId;
    let deleteProduct = await products.updateOne({_id: productId}, {$set: { isDelete : true}})
    let productInfo = await products.findOne({_id: productId});

    res.json({
    message : `${productInfo.productName} Deleted Succesfully`,
    productDetail : productInfo
    })

    }else {
        res.send("Please Register As Vendor")
    }
    
}