const joi = require('joi');

const borrowBookSchema = {
    params: joi.object({
        id: joi.string()
            .required()
            .messages({
                'string.base': 'Book ID should be a string',
                'any.required': 'Book ID is required'
            })
    })
};

module.exports = {
    borrowBookSchema
};