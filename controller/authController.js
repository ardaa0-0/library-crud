const authService = require('../services/authService');

const register = async (req, res) => { 
    const {type, statusCode, message, user} = await authService.createUser(req.body);

    if(type === 'Error') {
        return res.status(statusCode).json({message});
    }
    
    return res.status(statusCode).json({type, user});
}

module.exports = {
    register
}