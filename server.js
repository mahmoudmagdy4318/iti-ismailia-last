const express = require('express')
const app = express()
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('./axiosInstance');
require('dotenv').config();

const userRouter = require('./modules/users/userRouter');
const port = 3000;

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(express.static('public',{
    index:"layout.html"
}));

app.use('/users', userRouter);

app.get('/dataFromJson', async (req, res) => {
    const { data } = await axios.get("/todos");
    res.json(data);
})
mongoose.connect('mongodb://localhost:27017/iti-ismailia',(err)=>{
    if(err) process.exit(1);
    console.log("connected to database successfully");
});


app.listen(port, () => {
  console.log(`express app listening on port ${port}`)
})

app.use((err, req, res, next) => {
    res.send({
        status: err.statusCode,
        message: err.message,
        errors: err.errors || []
    });
})
