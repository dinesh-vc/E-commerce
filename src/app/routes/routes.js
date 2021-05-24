const express = require('express')
const route = express.Router();
const userController=require('../controller/user.controller')
const productController=require('../controller/product.controller')
const authValidate= require('../validation/auth');
const jwtValidate= require('../validation/jwtValidation')
const passport = require('passport');
const multer=require("../../middlewares/multer")

//authentication route

route.post("/register",authValidate.registerValidate, userController.register);
route.post("/login",authValidate.loginValidate, userController.login);
route.post("/logout",jwtValidate.valid, userController.logout);
route.post("/forgotPassword",jwtValidate.valid, userController.forgotPassword);
route.post("/verifyOTP",jwtValidate.valid, userController.verifyOTP);
route.post("/resetPassword",jwtValidate.valid, userController.resetPassword);
route.post("/emailVerification",jwtValidate.valid, userController.emailVerification);
route.post("/verifyEmail",jwtValidate.valid, userController.verifyEmail);

route.post('/googleAuth' , userController.googleAuth)


// Product Route
route.post('/addProduct',jwtValidate.valid, multer.array('productImage'), productController.addProduct);
route.post('/editProduct',jwtValidate.valid, productController.editProduct);
route.post('/addEditProduct',jwtValidate.valid, productController.addEditProduct);
route.post('/deleteProduct',jwtValidate.valid, productController.deleteProduct);

module.exports=route;