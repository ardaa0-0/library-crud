const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    author : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    stock : {
        type : Number,
        required : true,
        min : 0,
        default : 1
    },
    pageCount : {
        type : Number,
        required : true,
        min : 1
    }
}, {
    timestamps : true
})


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;