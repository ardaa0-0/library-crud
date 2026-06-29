const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

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

const verifyToken = catchAsync(async (req,res,next) => {
        
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            throw new AppError('You are not logged in! Please log in to get access.', 401);
        }
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);

        if(!user) { 
            throw new AppError('The user belonging to this token does no longer exist.', 401);
        }

        req.user = user;
        next();
});

module.exports = {
    verifyToken,
    restrictTo
}