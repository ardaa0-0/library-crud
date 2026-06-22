const jwt = require('jsonwebtoken');
const User = require('../models/User');

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};

const verifyToken = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(401).json({message : 'Please login first'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.id);

        if(!user) { 
            return res.status(401).json({message : 'User not found'});
        }

        req.user = user;
        next();

    }catch (error) {
        return res.status(401).json({message : 'Invalid token'});
    }   
}

module.exports = {
    verifyToken,
    restrictTo
}