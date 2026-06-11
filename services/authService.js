const User = require('../models/User');

const createUser = async (userBody) => {
    try {
        const userExists = await User.findOne({email});

        if(userExists) {
            return {
                type : 'Error',
                statusCode : 400,
                message : 'User already exists'
            }
        };

        const user = await User.create({
            userBody
        });

        return {
            type : 'Success',
            statusCode : 201,
            user
        }

    }catch (error) {
        console.log(error);
    }
}


const loginUser = async (userBody) => {
    
    const {email, password} = userBody;

    const user = await User.findOne({email});

    if(!user || !(await user.comparePassword(password))) {
        return {
            type : 'Error',
            statusCode : 401,
            message : 'Invalid email or password'
        }
    }

    return {
        type : 'Success',
        statusCode : 200,
        message : 'login successful',
        user
    }

}

module.exports = {
    createUser,
    loginUser
}