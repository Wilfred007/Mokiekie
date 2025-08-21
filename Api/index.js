
import express from 'express'
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
import uploadRouter from './routes/upload.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config()

console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'EXISTS' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'EXISTS' : 'MISSING');
console.log('MONGO:', process.env.MONGO ? 'EXISTS' : 'MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'EXISTS' : 'MISSING');

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err)
})

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
const __dirname = path.resolve();
app.use('/Api/user', userRouter);
app.use('/Api/auth', authRouter);
app.use('/Api/', uploadRouter);
app.use('/Api/listing', listingRouter);



// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 3000;


app.listen(3000, () => {
    console.log("Server is running on Port 3000")
});