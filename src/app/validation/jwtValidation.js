const Jwt = require("jsonwebtoken")
const config = require('../../config/config')


exports.valid=(req,res,next )=>{
    try {
        const token = req.headers["authorization"];

        const verified = Jwt.verify(token, config.JWTSecret)
        
        if(verified){
            next();
        }else{
            // Access Denied
           res.status(401).send("Token Invalid or Expire");
           
        }
    } catch (error) {
        // Access Denied
       res.status(401).send("Token Invalid or Expire");
        
    }

   
}
