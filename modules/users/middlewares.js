const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('./userModel');

const asyncVerify = util.promisify(jwt.verify);


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

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const payload = await asyncVerify(authorization, process.env.SECRET_KEY);
        const user = await User.findById(payload.id)
        req.user = user;
    } catch (error) {
        error.message = "unauthorized";
        error.statusCode = 403;
        next(error);
    }
    next();
}

module.exports = {
    validateData,
    verifyToken
}