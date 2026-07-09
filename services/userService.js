const User = require('../models/User');
const tokenService = require('./tokenService');
const AppError = require('../utils/AppError');

const getUser = async (userId) => {
        if(!userId) {
            throw new AppError('User ID is required', 400);
        }
        const user = await User.findById(userId);
        if(!user) {
            throw new AppError('User not found', 404);
        }
        return user;    
} 

const createUser = async (userBody) => {
        const userExists = await User.findOne({email : userBody.email});
        if(userExists) {
            throw new AppError('User already exists', 400);
        };
        return await User.create(userBody)
 
}

const addFavoriteBook = async (userId, bookId) => {
    const user = await User.findById(userId);

    if(!user) {
        throw new AppError('User not found', 404);
    }  

    if(user.favorites.includes(bookId)) {
        throw new AppError('Book already in favorites', 400);
    }

    user.favorites.push(bookId);
    await user.save();
    return user;
}

const getFavoriteBooks = async (userId) => {
    const user = await User.findById(userId).populate('favorites'); 
    return user.favorites;
}

module.exports = {
    getUser,
    createUser,
    addFavoriteBook,
    getFavoriteBooks
}