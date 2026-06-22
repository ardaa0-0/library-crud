const User = require('../models/User');
const tokenService = require('./tokenService');

const loginUser = async (userBody) => {

    try {
        
    const {email, password} = userBody;

    const user = await User.findOne({email});

    if(!user || !(await user.comparePassword(password))) {
        return {
            type : 'Error',
            statusCode : 401,
            message : 'Invalid email or password'
        }
    }

    const token = tokenService.generateAuthTokens(user);

    return {
        type : 'Success',
        statusCode : 200,
        message : 'login successful',
        user,
        token
    }


    }catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginUser
}