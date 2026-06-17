const joi = require('joi');

const bookAddSchema = {
    body: joi.object({
        title: joi.string()
            .required()
            .min(3)
            .max(100)
            .messages({
                'string.base': 'Title should be a string',
                'string.empty': 'Title cannot be empty',
                'string.min': 'Title must be at least 3 characters long',
                'string.max': 'Title cannot be longer than 100 characters'
            }),

        author: joi.string()
            .required()
            .min(3)
            .messages({
                'string.base': 'Author should be a string',
                'string.empty': 'Author cannot be empty',
                'string.min': 'Author must be at least 3 characters long'
            }),

        category: joi.string()
            .required()
            .min(3)
            .messages({
                'string.base': 'Category should be a string',
                'string.empty': 'Category cannot be empty',
                'string.min': 'Category must be at least 3 characters long'
            }),

        stock: joi.number()
            .required()
            .min(0)
            .messages({
                'number.base': 'Stock should be a number',
                'number.min': 'Stock must be a positive number',
                'number.empty' : 'Stock cannot be empty'
            }),

        pageCount: joi.number()
            .required()
            .min(1)
            .messages({
                'number.base': 'Page count should be a number',
                'number.min': 'Page count must be a positive number',
                "number.empty" : 'Page count cannot be empty'
            })
    })
};

module.exports = {
    bookAddSchema
};