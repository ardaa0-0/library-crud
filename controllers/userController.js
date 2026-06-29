const userService = require('../services/userService');
const catchAsync = require('../utils/catchAsync');

const getUserById = catchAsync(async (req,res,next) => {
    const user = await userService.getUser(req.params.id);
    res.status(200).json({user});
});

module.exports = {
    getUserById
}