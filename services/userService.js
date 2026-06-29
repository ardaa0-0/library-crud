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

module.exports = {
    getUser,
    createUser
}