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

module.exports = {
    addReview
}