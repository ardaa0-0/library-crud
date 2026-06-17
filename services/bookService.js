const Book = require('../models/Book');

const addBook = async (bookBody) => {

    try {
        const bookExists = await Book.findOne({title : bookBody.title});

        if(bookExists) {
            return {
                type : 'Error',
                statusCode : 400,
                message : 'Book already exists'
            }
        }

        const book = await Book.create(bookBody);

        return {
            type : 'Success',
            statusCode : 201,
            message : 'Book added successfully',
            book
        }

    } catch (error) {
            console.log(error);
    }
}

module.exports = {
    addBook
}