const nodemailer=require("nodemailer");


exports.email=(params,callback)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{

                user:'dineshchavda23103@gmail.com',
                pass:'Dinesh1234@'

            }

        });
        transporter.sendMail(params,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('email sent',info.response);
            }
        })
    }catch(err){
        console.log(err);
    }
}

module.exports=email;