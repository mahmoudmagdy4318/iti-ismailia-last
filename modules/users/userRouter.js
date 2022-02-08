const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./userModel');
const { login } = require('./usercontroller');
const { validateData } = require('./middlewares');
const userRouter = express.Router();

userRouter.get('/',async (req,res,next)=>{
    const users = await User.find();
    res.send(users);
});

const saltRounds = 10;
userRouter.post('/' ,async (req,res,next)=>{
    const { age, username, password } = req.body;
    try {    
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User({age, username, password: hash});
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
});
userRouter.patch('/:id', async (req,res,next)=> {
    const { age, username, password } = req.body;
    const { id } = req.params;
    try {    
        const hash = await bcrypt.hash(password, saltRounds);

        const updated = await User.findByIdAndUpdate(id , {
            age, username, password: hash
        })
        res.send(updated);
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
})

userRouter.post('/login' ,validateData , login);

module.exports = userRouter;