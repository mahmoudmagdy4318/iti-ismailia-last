const express = require('express');
const User = require('./userModel');
const { login } = require('./usercontroller');
const { validateData, verifyToken } = require('./middlewares');
const userRouter = express.Router();

userRouter.get('/',async (req,res,next)=>{
    const users = await User.find();
    res.send(users);
});

userRouter.post('/' ,async (req,res,next)=>{
    const { age, username, password } = req.body;
    try {    
        const user = new User({age, username, password});
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
});
userRouter.patch('/:id', async (req,res,next)=> {
    const { age, username ,password } = req.body;
    const { id } = req.params;
    try {    
        const updated = await User.findByIdAndUpdate(id , {
            age, username, password
        })
        res.send(updated);
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
})

userRouter.post('/login' ,validateData , login);

userRouter.get('/profile',verifyToken ,async (req,res,next)=>{
    const users = await User.find();
    res.send(users);
});


module.exports = userRouter;