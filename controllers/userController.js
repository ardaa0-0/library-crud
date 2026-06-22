const userService = require('../services/userService');

const getUserById = async (req,res) => {

    const {type, statusCode, message, user} = await userService.getUser(req.params.id);


    if(type === 'Error') {
        return res.status(statusCode).json({message});
    }

    res.status(statusCode).json({ type, message, user });
} 

module.exports = {
    getUserById
}