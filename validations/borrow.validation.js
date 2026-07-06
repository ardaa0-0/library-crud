const joi = require('joi');

const borrowBookSchema = {
    params: joi.object({
        id: joi.string()
            .required()
            .hex()
            .length(24)
            .messages({
                'string.base': 'Book ID should be a string',
                'any.required': 'Book ID is required',
                'hex': 'Book ID must be a valid hexadecimal string',
                'string.length': 'Book ID must be 24 characters long'   
            })
    })
};

module.exports = {
    borrowBookSchema
};