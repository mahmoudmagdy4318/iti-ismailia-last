const validateData = (req, res, next) => {
    const {username} =req.body;
    if(username.length <3) {
        const error = new Error('invalid username or password');
        error.statusCode = 422;
        next(error);
        next(new Error('invalid username or password'))
    }
    next();
}

module.exports = {
    validateData
}