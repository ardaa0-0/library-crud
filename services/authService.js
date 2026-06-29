const User = require('../models/User');
const tokenService = require('./tokenService');
const AppError = require('../utils/AppError');

const loginUser = async (userBody) => {
    const {email, password} = userBody;
    const user = await User.findOne({email});
    if(!user || !(await user.comparePassword(password))) {
        throw new AppError('Invalid email or password', 401);
    }
    return user;
}

module.exports = {
    loginUser
}