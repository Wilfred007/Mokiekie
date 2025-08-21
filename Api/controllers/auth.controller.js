

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
        res.cookie('access_token', token, {httpOnly: true, secure:true, sameSite: "none", path: '/'})
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