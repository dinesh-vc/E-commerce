
const Joi = require('@hapi/joi')
  const { user } = require('../validation/validate.schema');
  const { login } = require('../validation/validate.schema');
  


  const registerValidate  = async ( req , res , next) =>{



        const valid= await user.validate(req.body);
        if(valid.error){
            res.json({
                success : 0,
                message : valid.error.details[0].message
            })
        }else{
            next();
        }
    }
   
    const loginValidate = async ( req , res , next) =>{
      console.log(req.body)

        const valid= await login.validate(req.body);
        if(valid.error){
            res.json({
                success : 0,
                message : valid.error.details[0].message
            })
        }else{
          console.log("validate")
            next();
        }
    
}

module.exports = { registerValidate ,  loginValidate }