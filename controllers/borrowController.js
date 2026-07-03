const borrowService = require('../services/borrowService');
const catchAsync = require('../utils/catchAsync');

const borrowBook = catchAsync(async (req, res, next) => {
    const borrow = await borrowService.borrowBook(req.params.id, req.user.id);
    res.status(200).json({ message: "Book borrowed successfully", borrow });
});

const myBorrowedBooks = catchAsync(async (req, res, next) => {
    const borrowedBooks = await borrowService.myBorrowedBooks(req.user.id);
    res.status(200).json({ count : borrowedBooks.length, borrowedBooks });
});

module.exports = {
    borrowBook,
    myBorrowedBooks
}