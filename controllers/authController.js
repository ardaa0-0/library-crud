const authService = require('../services/authService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res, next) => { 
        const user = await userService.createUser(req.body);
        const token = tokenService.generateAuthTokens(user);
        return res.status(201).json({user, token});
})

const login = catchAsync(async (req,res, next) => {
        const user = await authService.loginUser(req.body);
        const token = tokenService.generateAuthTokens(user);
        return res.status(200).json({user, token});
});


module.exports = {
    register,
    login
}