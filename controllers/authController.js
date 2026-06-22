const authService = require('../services/authService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

const register = async (req, res) => { 
    const {type, statusCode, message, user} = await userService.createUser(req.body);


    if(type === 'Error') {
        return res.status(statusCode).json({message});
    }

    
    const token = tokenService.generateAuthTokens(user);
    
    return res.status(statusCode).json({type, user, token});
}

const login = async (req,res) => {
    const {type, statusCode, message, user} = await authService.loginUser(req.body);


    if(type === 'Error') {
        return res.status(statusCode).json({message});
    }

    
    const token = tokenService.generateAuthTokens(user);

    return res.status(statusCode).json({type, message, user, token});
}


module.exports = {
    register,
    login
}