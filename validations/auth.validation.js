const joi = require('joi');

const registerSchema = {
 body : joi.object({
    name : joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
        'string.base' : 'Name should be a string',
        'string.empty' : 'Name cannot be empty',
        'string.min' : 'Name should be at least 3 characters',
        'string.max' : 'Name should be at most 15 characters',
        'any.required' : 'Name is required'
    }),
    email : joi.string()
    .email()
    .required()
    .messages({
        'string.base' : 'Email should be a string',
        'string.empty' : 'Email cannot be empty',
        'string.email' : 'Email should be a valid email',
        'any.required' : 'Email is required'
    }),
    password : joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
        'string.base' : 'Password should be a string',
        'string.empty' : 'Password cannot be empty',
        'string.min' : 'Password should be at least 6 characters',
        'string.max' : 'Password should be at most 20 characters',
        'any.required' : 'Password is required'
    })
})};

const loginSchema = {
    body : joi.object({
        email : joi.string()
        .email()
        .required()
        .messages({
            'string.base' : 'Email should be a string',
            'string.empty' : 'Email cannot be empty',
            'string.email' : 'Email should be a valid email',
            'any.required' : 'Email is required'
        }),
        password : joi.string()
        .required()
        .messages({
            'string.base' : 'Password should be a string',
            'string.empty' : 'Password cannot be empty',
            'any.required' : 'Password is required'
        })
    })
};

module.exports = {
    registerSchema,
    loginSchema
}