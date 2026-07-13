const joi = require('joi');

const reviewSchema = {
    body: joi.object({
        rating: joi.number()
            .required()
            .min(1)
            .max(5)
            .messages({
                'number.base': 'Rating should be a number',
                'any.required': 'Rating is required',
                'number.min': 'Rating must be at least 1',
                'number.max': 'Rating must be at most 5'
            }),
        comment: joi.string()
            .optional()
            .max(200)
            .messages({
                'string.base': 'Comment should be a string',
                'string.max': 'Comment must be at most 200 characters long'
            })
    }).min(1).required().messages({ 
        'object.min': 'At least one field must be provided for review',
        'any.required': 'At least one field must be provided for review'
    })
};

module.exports = {
    reviewSchema
};