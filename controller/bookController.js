const bookService = require('../services/bookService');

const addBook = async (req, res) => {
    const {type, statusCode, message, book} = await bookService.addBook(req.body);

    if(type === 'Error') {
        return res.status(statusCode).json({message});
    }

    res.status(statusCode).json({ type, message, book });
};

module.exports = {
    addBook
}