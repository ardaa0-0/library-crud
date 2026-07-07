const Book = require('../models/Book');
const User = require('../models/User');
const Borrow = require('../models/Borrow');
const AppError = require('../utils/AppError');

const borrowBook = async (bookId, userId) => {
    const book = await Book.findById(bookId); 

    if (!book) {
        throw new AppError('Book not found', 404);
    }

    if (book.stock <= 0) {
        throw new AppError('Book is out of stock', 400);
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

    book.stock -= 1;
    await book.save();
    return borrow;
};

const myBorrowedBooks = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const borrowedBooks = await Borrow.find({ user: userId, returnedAt : null }).populate('book user', 'title author name email');

    if (borrowedBooks.length === 0) {
        throw new AppError('No borrowed books found for this user', 404);
    }

    return borrowedBooks;
}

const completeBorrow = async (borrowId, userId) => { 
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
        throw new AppError('Borrow record not found', 404);
    }

    if (borrow.user.toString() !== userId) {
        throw new AppError('You are not authorized to complete this borrow', 403);
    }

    if (borrow.returnedAt) {
        throw new AppError('This borrow has already been completed', 400);
    }

    const book = await Book.findById(borrow.book);

    book.stock += 1;
    await book.save();

    borrow.returnedAt = new Date();
    await borrow.save();
}

const borrowBookList = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const borrows = await Borrow.find()
        .skip(skip)
        .limit(limit)
        .populate('book user', 'title author name email');

    if (borrows.length === 0) {
        throw new AppError('No borrowed books found', 404);
    }

    return borrows;
}

module.exports = {
    borrowBook,
    myBorrowedBooks,
    completeBorrow,
    borrowBookList
};