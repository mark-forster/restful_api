const Joi=require('joi')

const userSchema=Joi.object({
    name:Joi.string()
    .alphanum()
    .min(8)
    .required(),
    email:Joi.string()
    .email()
    .required(),
    password:Joi.string()
    .min(7)
    .pattern(new RegExp('[a-zA-Z0-9]'))
    .required()
})

module.exports={
    userSchema
}