const borrowService = require('../services/borrowService');
const catchAsync = require('../utils/catchAsync');

const borrowBook = catchAsync(async (req, res, next) => {
    const borrow = await borrowService.borrowBook(req.params.id, req.user.id);
    res.status(200).json({ message: "Book borrowed successfully", borrow });
});

module.exports = {
    borrowBook
}