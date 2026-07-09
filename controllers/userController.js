const userService = require('../services/userService');
const catchAsync = require('../utils/catchAsync');

const getUserById = catchAsync(async (req,res,next) => {
    const user = await userService.getUser(req.params.id);
    res.status(200).json({user});
});

const addFavoriteBook = catchAsync(async (req,res,next) => {
    const user = await userService.addFavoriteBook(req.user.id, req.params.bookId);
    res.status(200).json({message : 'Book added to favorites', user});
});


module.exports = {
    getUserById,
    addFavoriteBook
}