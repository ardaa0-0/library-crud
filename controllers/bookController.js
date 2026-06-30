const bookService = require('../services/bookService');
const catchAsync = require('../utils/catchAsync');

const addBook = catchAsync(async (req, res,next) => {
    const book = await bookService.addBook(req.body);
    res.status(201).json({ type: "success", book });
})


const updateBook = catchAsync(async (req, res, next) => {
        const book = await bookService.updateBook(
            req.params.id,
            req.body
        );
        res.status(200).json({type: "success",book});
});

const deleteBook = catchAsync(async(req,res,next) => {
    const book = await bookService.deleteBook(req.params.id);
    res.status(200).json({message : "Book deleted successfully"});
});

const getBook = catchAsync(async(req,res,next) => {
    const book = await bookService.getBook(req.params.id);
    res.status(200).json({book});
});

const getAllBooks = catchAsync(async(req,res,next) => {
    const books = await bookService.getAllBooks();
    res.status(200).json({books});
});

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getBook,
    getAllBooks
}