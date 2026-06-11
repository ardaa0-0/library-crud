module.exports = (schema) => {
    return (req, res, next) => {
        
        const {error} = schema.body.validate(req.body);

        if(error) {
            return res.status(400).json({
                type : 'Error',
                statusCode : 400,
                message : error.message
            })
        }

        next();
    };
};