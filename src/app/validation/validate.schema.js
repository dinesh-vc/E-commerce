 const Joi = require('@hapi/joi')
const schema = {
    user: Joi.object({
        name : Joi.string().min(3).max(30).required(),
        userName :Joi.string().min(3).max(30).required(),
        userType : Joi.string().required(),
        password : Joi.string().min(7),
        email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).min(5).max(50).message("Invalid Email").required()

    }),
    login: Joi.object({
        userName :Joi.string(),
        email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).message("Invalid Email"),
        password: Joi.string().required()
    })
};

module.exports = schema;