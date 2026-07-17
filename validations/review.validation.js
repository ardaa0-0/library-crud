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


const idReviewSchema = {
    params: joi.object({
        reviewId: joi.string()
            .required()
            .length(24)
            .messages({
                'string.base': 'Review ID should be a string',
                'any.required': 'Review ID is required',
                'string.length': 'Review ID must be 24 characters long'
            })
    }).required().messages({
        'any.required': 'Review ID is required'
    })
};

module.exports = {
    reviewSchema,
    idReviewSchema
};