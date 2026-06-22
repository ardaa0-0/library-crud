const jwt = require('jsonwebtoken');

const generateAuthTokens = (user) => {

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '7d'
        }
    );

    return token;
}

module.exports = {
    generateAuthTokens
}