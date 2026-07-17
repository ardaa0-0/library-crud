const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const reviewController = require('../controllers/reviewController');
const reviewValidation = require('../validations/review.validation');

const router = express.Router();

router.post('/:bookId', auth.verifyToken, validate(reviewValidation.reviewSchema, 'body'), reviewController.addReview);
router.delete('/:reviewId', auth.verifyToken, validate(reviewValidation.idReviewSchema, 'params'), reviewController.deleteReview);
router.put('/:reviewId', auth.verifyToken, validate(reviewValidation.idReviewSchema, 'params'), validate(reviewValidation.reviewSchema, 'body'), reviewController.updateReview);
router.get('/:bookId', reviewController.getAllReviews);

module.exports = router;