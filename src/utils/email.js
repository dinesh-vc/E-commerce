const nodemailer=require("nodemailer");
var registerUser = require("../app/models/user.model");
exports.email=(params,callback)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{

                user:'dineshchavda23104@gmail.com',
                pass:'Abcd1234@'

            }

        });
        transporter.sendMail(params,function(error,info){
            if(error) callback(error, []);
            if(info) callback(undefined, info);
        })
    }catch(err){
        console.log(err);
    }
}