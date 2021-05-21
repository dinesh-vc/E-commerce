const user = require("../models/user.model");
require('dotenv').config();
const jwt = require("jsonwebtoken")
const config = require('../../config/config')
const fs = require('fs')

const mail = require('../../utils/email')
// Import Bycrpt module for password hasing
const bcrypt = require('bcrypt')

 // regisration request
exports.register = async (req, res) => {
    try {
        let email = req.body.email;
        let userInfo = await user.findOne({
            email: email
        })
        if (userInfo) {
            res.send(`Someone is already registed with ${email} !! Please Register With Another Mail Id !!!!`)
        } else {
            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword;

                const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                password = await bcrypt.hash(password, salt);

             
                
                const userRegistration = new user({

                        name: req.body.name,
                        userName: req.body.userName,
                        userType: req.body.userType,
                        email: req.body.email,
                        password : password
                })

                const registred =await userRegistration.save();
                let userInfo = await user.findOne({
                    email: email
                })
               
                res.json({
                    message : `${userInfo.name} Registed Succesfully`,
                    data : {
                        name: userInfo.name,
                        username: userInfo.userName,
                        userType: userInfo.userType,
                        email: userInfo.email
                    }
                })
          

        }
    } catch (error) {
        console.log(error)
    }
}
 

// login request
exports.login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let  userInfo = await user.findOne({email: email })
       if (!userInfo) {res.send("Please Register First !!")
        } else {
            let comparedPassword = await bcrypt.compare(password, userInfo.password);
            if (email === userInfo.email && comparedPassword) {
            var token = jwt.sign({email: userInfo.email}, config.JWTSecret, {expiresIn: '36000s'});
                res.json({
                    message : `${userInfo.name} Login Succesfully`,
                    data : {
                        name: userInfo.name,
                        username: userInfo.userName,
                        userType: userInfo.userType,
                        email: userInfo.email,
                        token : token
                    }
                })
                var addToken = await user.updateOne({email: userInfo.email}, {$push: {token: token}});
            } else {
                res.send("Username and Password Invalid !!!")
            }
        }

    } catch (error) {

        console.log(error)

    }
};
// logout request
exports.logout = async (req, res) => {

    try {
        let email = req.body.email;
        let userInfo = await user.findOne({
            email: email
        })

        const token = req.headers["authorization"];
        const verified = jwt.verify(token, config.JWTSecret);

        var removeToken = await user.updateOne({
            email: email
        }, {
            $pull: {
                token: token
            }
        });
        res.send(` ${userInfo.name} Logout Succesfully`)

    } catch (error) {

        console.log(error)

    }
};

exports.forgotPassword = async (req, res) => {

    const OTP = Math.floor(1000 + Math.random() * 9000);
    let email = req.body.email;
    let userInfo = await user.findOne({
        email: email
    })
    var addOTP = await user.updateOne({ email: email}, { $push: {OTP: OTP}});
    try {
        let mailOptions = {
            from: 'dineshchavda23104@gmail.com',
            to: req.body.email, // list of receivers
            subject: "OTP for forgot password", // Subject line
            html: `<b>Welcome ${userInfo.name}</b> <br> You request for forgot password OTP.<br> Your OTP is ${OTP} <br> Thank You`

        };

        mail.email(mailOptions, (err) => {
            if (err) {
                res.send("User Not Found ");
            } else {
                res.json({
                    message : "OTP Sent Succusfully on Registred Mail",
                    data : {
                        name: userInfo.name,
                        username: userInfo.userName,
                        userType: userInfo.userType,
                        email: userInfo.email
                    }
                })
            }
        });

    } catch (error) {

        console.log(error)

    }
};


exports.verifyOTP = async (req, res) => {

    try {
        let email = req.body.email;
        let OTP = req.body.OTP;

        let userInfo = await user.findOne({
            email: email
        })

        let OTPArray = userInfo.OTP;

        let isValid= OTPArray.includes(OTP);

        
            if (isValid) {

                var verifyOTP = await user.updateOne({email: email}, { $pull: {  OTP: OTP}});
                if (verifyOTP) {
                    res.json({
                        message :"Please Enter New Password",
                        data : {
                        name: userInfo.name,
                        username: userInfo.userName,
                        userType: userInfo.userType,
                        email: userInfo.email
                        }
                        
                    })

                }
            } else {

                res.send("Invalid OTP")
            }
            

    } catch (error) {

        console.log(error)

    }
};

// regisration request
exports.resetPassword= async (req, res) => {
    try {

        let email = req.body.email;
     
        let userInfo = await user.findOne({
            email: email
        })
            let password = req.body.newPassword;
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            password = await bcrypt.hash(password, salt);

            var updatePassword = await user.updateOne({email: email}, { $set: {password: password}});
            if(updatePassword){
            res.json({
                message : "Password Update Succesfully",

                data : {
                    name: userInfo.name,
                    username: userInfo.userName,
                    userType: userInfo.userType,
                    email: userInfo.email
                }
        
            })

        } else {
            res.send("Database Error")
        }


        
    } catch (error) {
        console.log(error)
    }
}

exports.emailVerification = async (req, res) => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let email = req.body.email;
    let userInfo = await user.findOne({
        email: email
    })
    
    var addOTP = await user.updateOne({ email: email}, { $push: { emailToken: token}});
    try {
        let mailOptions = {
            from: 'dineshchavda23104@gmail.com',
            to: req.body.email, // list of receivers
            subject: "Email Verification", // Subject line
            html: ` Hello ${userInfo.name} '<br>please verify your account by clicking the link:<br>http://localhost:3003/login/${token}'<br>Thank you!!<br>'`
        };

        mail.email(mailOptions, (err) => {
            if (err) {
                res.send("User Not Found ");
            } else {
                res.json({
                    message : "Email Verification link Sent Succusfully on Registred Mail",
                    data : {
                        name: userInfo.name,
                        username: userInfo.userName,
                        userType: userInfo.userType,
                        email: userInfo.email
                    }
                })
            }
        });

    } catch (error) {

        console.log(error)

    }
};

exports.verifyEmail = async (req, res) => {

    try {
        let email = req.body.email;
        let emailToken = req.body.emailToken;

        console.log(emailToken)

        let userInfo = await user.findOne({
            email: email
        })
       
        let tokenArray = userInfo.emailToken;

        let isValid= tokenArray.includes(emailToken);

        
       
            if (isValid) {

                var verifyToken = await user.updateOne({email: email}, { $pull: {  emailToken: emailToken}});
                if (verifyToken) {
                    res.json({
                        message : "Email Verified",
                        data : {
                            name: userInfo.name,
                            username: userInfo.userName,
                            userType: userInfo.userType,
                            email: userInfo.email
                        }
                    })

                }
            } else {
                res.send("Invalid link ")
            }
            
    

    } catch (error) {

        console.log(error)

    }
};

exports.googleAuth= async (req , res ) => {
    res.send("Hello")
}
