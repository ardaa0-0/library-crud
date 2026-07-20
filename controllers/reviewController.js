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

const getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await reviewService.getAllReviews(req.params.bookId);
    res.status(200).json({ reviews });
});

const updateReview = catchAsync(async (req, res, next) => {
    const updatedReview = await reviewService.updateReview(req.params.reviewId, req.user.id, req.body);
    res.status(200).json({ updatedReview });
});

const getReviewById = catchAsync(async (req, res, next) => {
    const review = await reviewService.getReviewById(req.params.reviewId);
    res.status(200).json({ review });
});

module.exports = {
    addReview,
    deleteReview,
    getAllReviews,
    updateReview,
    getReviewById
}