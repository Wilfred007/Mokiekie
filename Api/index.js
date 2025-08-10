import express from 'express'
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'


dotenv.config()



mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MondoDB");
}).catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on Port 3000")
});


app.use('/Api/user', userRouter);
app.use('/Api/auth', authRouter);


//create middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});