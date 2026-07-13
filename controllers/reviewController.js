const reviewService = require('../services/reviewService');
const catchAsync = require('../utils/catchAsync');

const addReview = catchAsync(async (req, res, next) => {
    const review = await reviewService.addReview(req.params.bookId, req.user.id, req.body);
    res.status(201).json({review });
});

module.exports = {
    addReview
}