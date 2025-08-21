// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import {errorHandler} from '../utils/error.js'
// import jwt from "jsonwebtoken";


// export const signup = async (req, res, next) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 10)
//     const newUser = new User({ username, email, password:hashedPassword});
//     try {

//         await  newUser.save()
//         res.status(201).json("User created successfully")
        
//     } catch (error) {
//        res.status(500).json(error.message) 
//     }
// };


// export const signin = async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const validUser = await User.findOne({email: email});

//         if(!validUser) return next(errorHandler(404, 'User does not exist'));
//         const validPassword = bcrypt.compareSync(password, validUser.password);
//         if(!validPassword) return next(errorHandler(401, 'Wrong Credentials '));
//         const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
//         const { password: pass, ...rest } = validUser._doc;
//         res.cookie('access_token', token, {httpOnly: true})
//         .status(200)
//         .json(rest);
//     } catch (error) {
//         next(error)
        
//     }
// };

// const resetPasswordLink = async (email) => {

// }


// export const forgotPassword = async (req, res, next) => {
//     const { email } = req.body;

//     // if(!email) return next(errorHandler(404, 'Email is required'))
//     try {
//         const response = await resetPasswordLink(email);

//         if (response.success) {

//         }
//     } catch (error) {
        
//     }

// }

// export const google = async (req, res, next) => {

//     try {
//         const user = await User.findOne({email: req.body.email})
//         if(user) {
//             const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
//             const { password: pass, ...rest} = user._doc;
//             res 
//             .cookie('access_token', token, { httpOnly: true}) 
//             .status(200)
//             .json(rest)
//         } else {
//             const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//             const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
//             const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, avatar: req.body.photo});

//             await newUser.save();

//             const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
//             const { password: pass, ...rest } = newUser._doc;
//             res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest)
//         }
//     } catch (error) {
//         next(error)
//     }

// }


// export const signout = async(req, res, next) => {
//     try {
//         res.clearCookie('access_token');
//         res.status(200).json('User has been logged out');
        
//     } catch (error) {
//         next(error)
//     }
// }


// // import User from '../models/user.model.js';
// // import bcryptjs from 'bcryptjs';
// // import { errorHandler } from '../utils/error.js';
// // import jwt from 'jsonwebtoken';

// // export const signup = async (req, res, next) => {
// //   const { username, email, password, role } = req.body;
  
// //   try {
// //     // Validate input
// //     if (!username || !email || !password) {
// //       return next(errorHandler(400, 'Username, email, and password are required'));
// //     }

// //     // Check if user already exists
// //     const existingUser = await User.findOne({ 
// //       $or: [{ email }, { username }] 
// //     });
    
// //     if (existingUser) {
// //       const field = existingUser.email === email ? 'email' : 'username';
// //       return next(errorHandler(400, `User with this ${field} already exists`));
// //     }

// //     // Hash password
// //     const hashedPassword = bcryptjs.hashSync(password, 10);
    
// //     // Determine user role (only admins can create other admins/moderators)
// //     let userRole = 'user'; // default role
    
// //     // If role is specified in request, validate it
// //     if (role) {
// //       if (!['user', 'moderator', 'admin'].includes(role)) {
// //         return next(errorHandler(400, 'Invalid role specified'));
// //       }
      
// //       // Only allow role assignment during development or by admin
// //       if (process.env.NODE_ENV === 'development') {
// //         userRole = role;
// //       } else {
// //         // In production, only default to 'user' unless it's the first user
// //         const userCount = await User.countDocuments();
// //         if (userCount === 0) {
// //           userRole = 'admin'; // First user becomes admin
// //         }
// //       }
// //     }

// //     // Create new user
// //     const newUser = new User({
// //       username,
// //       email,
// //       password: hashedPassword,
// //       role: userRole
// //     });

// //     await newUser.save();
    
// //     // Remove password from response
// //     const { password: pass, ...userInfo } = newUser._doc;
    
// //     res.status(201).json({
// //       success: true,
// //       message: 'User created successfully',
// //       user: userInfo
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const signin = async (req, res, next) => {
// //   const { email, password } = req.body;
  
// //   try {
// //     // Validate input
// //     if (!email || !password) {
// //       return next(errorHandler(400, 'Email and password are required'));
// //     }

// //     // Find user by email
// //     const validUser = await User.findOne({ email });
// //     if (!validUser) {
// //       return next(errorHandler(404, 'Invalid credentials'));
// //     }

// //     // Check if user is active
// //     if (!validUser.isActive) {
// //       return next(errorHandler(403, 'Account is inactive. Please contact administrator.'));
// //     }

// //     // Validate password
// //     const validPassword = bcryptjs.compareSync(password, validUser.password);
// //     if (!validPassword) {
// //       return next(errorHandler(401, 'Invalid credentials'));
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign(
// //       { 
// //         id: validUser._id,
// //         role: validUser.role 
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '7d' }
// //     );

// //     // Remove password from response
// //     const { password: pass, ...userInfo } = validUser._doc;

// //     res
// //       .cookie('access_token', token, { 
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === 'production',
// //         sameSite: 'strict',
// //         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
// //       })
// //       .status(200)
// //       .json({
// //         success: true,
// //         message: 'Login successful',
// //         user: {
// //           ...userInfo,
// //           permissions: validUser.getPermissions()
// //         }
// //       });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const google = async (req, res, next) => {
// //   try {
// //     const { name, email, photo } = req.body;
    
// //     // Check if user exists
// //     let user = await User.findOne({ email });
    
// //     if (user) {
// //       // User exists - check if active and sign them in
// //       if (!user.isActive) {
// //         return next(errorHandler(403, 'Account is inactive. Please contact administrator.'));
// //       }
      
// //       const token = jwt.sign(
// //         { 
// //           id: user._id,
// //           role: user.role 
// //         },
// //         process.env.JWT_SECRET,
// //         { expiresIn: '7d' }
// //       );
      
// //       const { password: pass, ...userInfo } = user._doc;
      
// //       res
// //         .cookie('access_token', token, { 
// //           httpOnly: true,
// //           secure: process.env.NODE_ENV === 'production',
// //           sameSite: 'strict',
// //           maxAge: 7 * 24 * 60 * 60 * 1000
// //         })
// //         .status(200)
// //         .json({
// //           success: true,
// //           message: 'Google login successful',
// //           user: {
// //             ...userInfo,
// //             permissions: user.getPermissions()
// //           }
// //         });
// //     } else {
// //       // Create new user with Google account
// //       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
// //       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      
// //       // Generate unique username from name
// //       let username = name.split(' ').join('').toLowerCase();
// //       const existingUsername = await User.findOne({ username });
// //       if (existingUsername) {
// //         username = username + Math.random().toString(36).slice(-4);
// //       }
      
// //       const newUser = new User({
// //         username,
// //         email,
// //         password: hashedPassword,
// //         avatar: photo,
// //         role: 'user' // Default role for Google sign-ups
// //       });
      
// //       await newUser.save();
      
// //       const token = jwt.sign(
// //         { 
// //           id: newUser._id,
// //           role: newUser.role 
// //         },
// //         process.env.JWT_SECRET,
// //         { expiresIn: '7d' }
// //       );
      
// //       const { password: pass, ...userInfo } = newUser._doc;
      
// //       res
// //         .cookie('access_token', token, { 
// //           httpOnly: true,
// //           secure: process.env.NODE_ENV === 'production',
// //           sameSite: 'strict',
// //           maxAge: 7 * 24 * 60 * 60 * 1000
// //         })
// //         .status(200)
// //         .json({
// //           success: true,
// //           message: 'Google account created and logged in',
// //           user: {
// //             ...userInfo,
// //             permissions: newUser.getPermissions()
// //           }
// //         });
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const signOut = async (req, res, next) => {
// //   try {
// //     res.clearCookie('access_token');
// //     res.status(200).json({
// //       success: true,
// //       message: 'User has been logged out successfully'
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const refreshToken = async (req, res, next) => {
// //   try {
// //     const token = req.cookies.access_token;
    
// //     if (!token) {
// //       return next(errorHandler(401, 'No token provided'));
// //     }
    
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.id);
    
// //     if (!user || !user.isActive) {
// //       return next(errorHandler(401, 'Invalid token or inactive user'));
// //     }
    
// //     // Generate new token
// //     const newToken = jwt.sign(
// //       { 
// //         id: user._id,
// //         role: user.role 
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '7d' }
// //     );
    
// //     const { password: pass, ...userInfo } = user._doc;
    
// //     res
// //       .cookie('access_token', newToken, { 
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === 'production',
// //         sameSite: 'strict',
// //         maxAge: 7 * 24 * 60 * 60 * 1000
// //       })
// //       .status(200)
// //       .json({
// //         success: true,
// //         message: 'Token refreshed successfully',
// //         user: {
// //           ...userInfo,
// //           permissions: user.getPermissions()
// //         }
// //       });
// //   } catch (error) {
// //     if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
// //       return next(errorHandler(401, 'Invalid or expired token'));
// //     }
// //     next(error);
// //   }
// // };

// // // Admin only: Create user with specific role
// // export const createUserWithRole = async (req, res, next) => {
// //   const { username, email, password, role } = req.body;
  
// //   try {
// //     // This would be called with admin middleware protecting the route
// //     if (!req.user.isAdmin()) {
// //       return next(errorHandler(403, 'Only admins can create users with specific roles'));
// //     }
    
// //     if (!username || !email || !password || !role) {
// //       return next(errorHandler(400, 'All fields are required'));
// //     }
    
// //     if (!['user', 'moderator', 'admin'].includes(role)) {
// //       return next(errorHandler(400, 'Invalid role specified'));
// //     }
    
// //     // Check if user already exists
// //     const existingUser = await User.findOne({ 
// //       $or: [{ email }, { username }] 
// //     });
    
// //     if (existingUser) {
// //       const field = existingUser.email === email ? 'email' : 'username';
// //       return next(errorHandler(400, `User with this ${field} already exists`));
// //     }
    
// //     const hashedPassword = bcryptjs.hashSync(password, 10);
    
// //     const newUser = new User({
// //       username,
// //       email,
// //       password: hashedPassword,
// //       role
// //     });
    
// //     await newUser.save();
    
// //     const { password: pass, ...userInfo } = newUser._doc;
    
// //     res.status(201).json({
// //       success: true,
// //       message: `${role} user created successfully`,
// //       user: userInfo
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from '../utils/error.js'
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password:hashedPassword});
    try {

        await  newUser.save()
        res.status(201).json("User created successfully")
        
    } catch (error) {
       res.status(500).json(error.message) 
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({email: email});

        if(!validUser) return next(errorHandler(404, 'User does not exist'));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong Credentials '));
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error)
    }
};

const resetPasswordLink = async (email) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: 'No account found with this email address'
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetURL}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 15 minutes.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
          <hr>
          <p style="font-size: 12px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetURL}">${resetURL}</a>
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Password reset link sent to your email'
    };

  } catch (error) {
    console.error('Reset password link error:', error);
    return {
      success: false,
      message: 'Failed to send reset email'
    };
  }
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if(!email) return next(errorHandler(400, 'Email is required'))
    
    try {
        const response = await resetPasswordLink(email);

        if (response.success) {
            res.status(200).json({
                success: true,
                message: response.message
            });
        } else {
            res.status(404).json({
                success: false,
                message: response.message
            });
        }
    } catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return next(errorHandler(400, 'New password is required'));
  }

  if (newPassword.length < 6) {
    return next(errorHandler(400, 'Password must be at least 6 characters long'));
  }

  try {
    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(errorHandler(400, 'Invalid or expired reset token'));
    }

    // Update password with bcrypt hashing (same as your signup)
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {

    try {
        const user = await User.findOne({email: req.body.email})
        if(user) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest} = user._doc;
            res 
            .cookie('access_token', token, { httpOnly: true}) 
            .status(200)
            .json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, avatar: req.body.photo});

            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }

}

export const signout = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
        
    } catch (error) {
        next(error)
    }
}