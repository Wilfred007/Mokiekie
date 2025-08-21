
import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { deleteUser, getUserListings, getUser } from "../controllers/user.controllers.js";

const router = express.Router();
router.use(cookieParser());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Check Authorization header first, then cookies
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Update user profile
router.post("/update/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res
        .status(403)
        .json({ error: "You can only update your own account!" });
    }

    const { username, email, password, avatar } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;
    if (password) updateData.password = bcryptjs.hashSync(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    const { password: pass, ...userWithoutPassword } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Update error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists!`,
      });
    }

    res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});


router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/listings/:id', verifyToken, getUserListings)

router.get('/:id', verifyToken, getUser)

// router.post('/update/:id', verifyToken, updateListing)
export default router;


// import express from 'express';
// import {
//   test,
//   deleteUser,
//   updateUser,
//   getUserListings,
//   getUser,
//   getAllUsers,
//   updateUserRole,
//   toggleUserStatus,
//   getUserPermissions
// } from '../controllers/user.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';
// import { requireRole, requireRoleLevel, requirePermission } from '../middleware/auth.js';

// const router = express.Router();

// // Public test route
// router.get('/test', test);

// // Protected routes - require authentication
// router.use(verifyToken); // All routes below require authentication

// // User profile routes
// router.get('/profile/:id', getUser); // Get user profile (own or others based on role)
// router.post('/update/:id', updateUser); // Update user profile
// router.delete('/delete/:id', deleteUser); // Delete user account

// // User listings - separate routes instead of optional parameter
// router.get('/listings', getUserListings); // Get current user's listings
// router.get('/listings/:id', getUserListings); // Get specific user's listings

// // User permissions
// router.get('/permissions/:id', getUserPermissions); // Get user permissions

// // Admin/Moderator only routes
// router.get('/all', requireRoleLevel('moderator'), getAllUsers); // Get all users (paginated)
// router.post('/toggle-status/:id', requireRoleLevel('moderator'), toggleUserStatus); // Activate/deactivate user

// // Admin only routes
// router.post('/update-role/:id', requireRole('admin'), updateUserRole); // Change user role

// export default router;