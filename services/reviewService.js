const Book = require('../models/Book');
const Review = require('../models/Review');
const AppError = require('../utils/AppError');

const addReview = async (bookId, userId, reviewBody) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError('Book not found', 404);
    }

    const existingReview = await Review.findOne({ book: bookId, user: userId });

    if (existingReview) {
        throw new AppError('You have already reviewed this book', 400);
    }

    const review = await Review.create({
        user: userId,
        book: bookId,
        rating: reviewBody.rating,
        comment: reviewBody.comment
    });
    const reviews = await Review.find({ book: bookId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = totalRating / reviews.length;
    book.reviewCount = reviews.length;
    await book.save();
    return review;
};

const deleteReview = async (reviewId, userId) => {
    
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new AppError('Review not found', 404);
    }

    if (review.user.toString() !== userId) {
        throw new AppError('You are not authorized to delete this review', 403);
    }

    await Review.findByIdAndDelete(reviewId);
    const book = await Book.findById(review.book);
    const reviews = await Review.find({ book: review.book });

    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        book.averageRating = totalRating / reviews.length;
        book.reviewCount = reviews.length;
    } else {
        book.averageRating = 0;
        book.reviewCount = 0;
    }
    await book.save();
};

const getAllReviews = async (bookId) => {
    const book = await Book.findById(bookId);

    if (!book) {
        throw new AppError('Book not found', 404);
    }

    const reviews = await Review.find({ book: bookId }).populate('user', 'name email');

    if(reviews.length === 0) {
        throw new AppError('No reviews found for this book', 404);
    }
    
    return reviews;
}

const updateReview = async (reviewId, userId, reviewBody) => {
    const review = await Review.findById(reviewId); 

    if (!review) {  
        throw new AppError('Review not found', 404);
    }

    if (review.user.toString() !== userId) {
        throw new AppError('You are not authorized to update this review', 403);
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewBody, { new: true });
    const book = await Book.findById(review.book);
    const reviews = await Review.find({ book: review.book });

    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        book.averageRating = totalRating / reviews.length;
        book.reviewCount = reviews.length;
    } else {
        book.averageRating = 0;
        book.reviewCount = 0;
    }
    await book.save();

    return updatedReview;
};

module.exports = {
    addReview,
    deleteReview,
    getAllReviews,
    updateReview
}