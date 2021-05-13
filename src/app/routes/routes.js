const express = require('express')
const route = express.Router();
const controller=require('../controller/user.controller')
const authValidate= require('../validation/auth')

route.post("/register",authValidate.registerValidate, controller.register);

route.post("/login",authValidate.loginValidate, controller.login);

route.post("/logout", controller.logout);

route.post("/forgotPassword", controller.forgotPassword);
route.post("/verifyOTP", controller.verifyOTP);
route.post("/resetPassword", controller.resetPassword);


module.exports=route;