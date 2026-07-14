const reviewService = require('../services/reviewService');
const catchAsync = require('../utils/catchAsync');

const addReview = catchAsync(async (req, res, next) => {
    const review = await reviewService.addReview(req.params.bookId, req.user.id, req.body);
    res.status(201).json({review });
});

const deleteReview = catchAsync(async (req, res, next) => {
    await reviewService.deleteReview(req.params.reviewId, req.user.id);
    res.status(204).json({ message: 'Review deleted successfully' });
});

module.exports = {
    addReview,
    deleteReview
}