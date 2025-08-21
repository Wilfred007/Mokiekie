import express from 'express'
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
import uploadRouter from './routes/upload.route.js'
import listingRouter from './routes/listing.route.js'
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
app.use('/Api/listing', listingRouter);  


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

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.routes.js';
// import authRouter from './routes/auth.route.js';
// import uploadRouter from './routes/upload.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// // import cors from 'cors';

// dotenv.config();

// // Environment variables debug
// console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
// console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
// console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'EXISTS' : 'MISSING');
// console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'EXISTS' : 'MISSING');
// console.log('MONGO:', process.env.MONGO ? 'EXISTS' : 'MISSING');
// console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'EXISTS' : 'MISSING');
// console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
// console.log('=====================================');

// // MongoDB connection
// mongoose.connect(process.env.MONGO).then(() => {
//   console.log("Connected to MongoDB");
// }).catch((err) => {
//   console.log('MongoDB connection error:', err);
// });

// const app = express();

// // Middleware
// // app.use(cors({
// //   origin: process.env.CLIENT_URL || 'http://localhost:3000',
// //   credentials: true
// // }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cookieParser());

// // Request logging middleware (optional)
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // API Routes
// app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);
// app.use('/api/upload', uploadRouter);
// app.use('/api/listing', listingRouter);

// // 404 handler for undefined routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     statusCode: 404,
//     message: `Route ${req.originalUrl} not found`
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
  
//   // Log error for debugging
//   if (statusCode === 500) {
//     console.error('Server Error:', err);
//   }
  
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on Port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/health`);
  
//   // Create default admin user if none exists (development only)
//   if (process.env.NODE_ENV === 'development') {
//     createDefaultAdmin();
//   }
// });

// // Function to create default admin user (development only)
// async function createDefaultAdmin() {
//   try {
//     const User = (await import('./models/user.model.js')).default;
//     const bcrypt = (await import('bcryptjs')).default;
    
//     const adminExists = await User.findOne({ role: 'admin' });
    
//     if (!adminExists) {
//       const hashedPassword = bcrypt.hashSync('admin123', 10);
      
//       const defaultAdmin = new User({
//         username: 'admin',
//         email: 'admin@localhost.com',
//         password: hashedPassword,
//         role: 'admin',
//         isActive: true
//       });
      
//       await defaultAdmin.save();
//       console.log('🔑 Default admin user created:');
//       console.log('   Email: admin@localhost.com');
//       console.log('   Password: admin123');
//       console.log('   ⚠️  Please change this password in production!');
//     }
//   } catch (error) {
//     console.error('Error creating default admin:', error.message);
//   }
// }

// export default app;