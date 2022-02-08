const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const asyncSign = util.promisify(jwt.sign);

const secretKey=  "ksdwkjwncnjewfjwnewrnj";
const login = async (req,res,next)=>{
    const { username, password } = req.body;
    try {
        const user  = await User.findOne({ username});
        if(!user)throw new Error('invalid username or password');
        const {password: hashedPassword} = user;
        const result = await bcrypt.compare(password, hashedPassword);
        if(!result) throw new Error('invalid username or password');
        const token = await asyncSign({
            id: user.id
        }, secretKey);

        res.send({token});
    } catch (error) {
        next(error);
    }
}

module.exports ={
    login
}