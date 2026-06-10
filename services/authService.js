const User = require('../models/User');

const createUser = async (userBody) => {
    try {
        
        const {name, email, password} = userBody;

        if(!(name && email && password)) {
            return {
                type : 'Error',
                statusCode : 400,
                message : 'All fields are required'
            }
        };

        const userExists = await User.findOne({email});

        if(userExists) {
            return {
                type : 'Error',
                statusCode : 400,
                message : 'User already exists'
            }
        };

        const user = await User.create({
            email,
            name,
            password
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

module.exports = {
    createUser
}