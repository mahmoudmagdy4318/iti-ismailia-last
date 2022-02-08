const bcrypt = require('bcrypt');

const User = require('./userModel');
const login = async (req,res,next)=>{
    const { username, password } = req.body;
    try {
        const user  = await User.findOne({ username});
        if(!user)throw new Error('invalid username or password');
        const {password: hashedPassword} = user;
        const result = await bcrypt.compare(password, hashedPassword);
        if(!result) throw new Error('invalid username or password');
        res.send('loginned successfully');
    } catch (error) {
        next(error);
    }
}

module.exports ={
    login
}