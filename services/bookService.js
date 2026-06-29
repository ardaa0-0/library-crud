const Book = require('../models/Book');
const AppError = require('../utils/AppError');

const addBook = async (bookBody) => {
        const bookExists = await Book.findOne({title : bookBody.title});
        if(bookExists) {
            throw new AppError('Book already exists', 400);
        }
        return await Book.create(bookBody);
}

const updateBook = async (bookId, bookBody) => {
        const book = await Book.findByIdAndUpdate(
            bookId,
            bookBody,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );
        if (!book) {
            throw new AppError('Book not found', 404);
        }
        return book;
};


const deleteBook = async (bookId) => {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
        throw new AppError('Book not found', 404);
    }
    return book;
}

const getBook = async (bookId) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError('Book not found', 404);
    }
    return book;
}

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getBook
}