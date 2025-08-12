import express from 'express'
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
import uploadRouter from './routes/upload.route.js'
import cookieParser from 'cookie-parser';


dotenv.config()


console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'EXISTS' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'EXISTS' : 'MISSING');
console.log('MONGO:', process.env.MONGO ? 'EXISTS' : 'MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'EXISTS' : 'MISSING');
console.log('=====================================');



mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MondoDB");
}).catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on Port 3000")
});


app.use('/Api/user', userRouter);
app.use('/Api/auth', authRouter);
app.use('/Api', uploadRouter);  

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