const Book = require('../models/Book');
const User = require('../models/User');
const Borrow = require('../models/Borrow');
const AppError = require('../utils/AppError');

const borrowBook = async (bookId, userId) => {
    const book = await Book.findById(bookId); 

    if (!book) {
        throw new AppError('Book not found', 404);
    }

    if (book.isBorrowed) {
        throw new AppError('Book is already borrowed', 400);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const borrow = await Borrow.create({
        user : user._id,
        book: book._id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });

    book.bookIsBorrowed = true;
    await book.save();
    return borrow;
};

const myBorrowedBooks = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const borrowedBooks = await Borrow.find({ user: userId }).populate('book user', 'title author name email');

    if (borrowedBooks.length === 0) {
        throw new AppError('No borrowed books found for this user', 404);
    }

    return borrowedBooks;
}

module.exports = {
    borrowBook,
    myBorrowedBooks
};