// import express from "express";
// import { test } from "../controllers/user.controllers.js";



// const router = express.Router();



// router.get('/test', test);


// export default router;


// import express from "express";
// import bcryptjs from "bcryptjs";
// import User from "../models/user.model.js"; // Adjust path to your user model
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

//   if (!token) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token." });
//   }
// };

// // Update user profile
// router.post("/update/:id", verifyToken, async (req, res) => {
//   try {
//    // Check if the user is updating their own profile
//     if (req.user.id !== req.params.id) {
//       return res.status(403).json({ error: "You can only update your own account!" });
//     }

//     const { username, email, password, avatar } = req.body;
    
//     // Prepare update object
//     const updateData = {};
    
//     if (username) updateData.username = username;
//     if (email) updateData.email = email;
//     if (avatar) updateData.avatar = avatar;
    
//     // Hash password if provided
//     if (password) {
//       updateData.password = bcryptjs.hashSync(password, 10);
//     }

//     // Update user in database
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true } // Return updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found!" });
//     }

//     // Remove password from response
//     const { password: pass, ...userWithoutPassword } = updatedUser._doc;

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully!",
//       user: userWithoutPassword
//     });

//   } catch (error) {
//     console.error("Update error:", error);
    
//     // Handle duplicate key errors (username/email already exists)
//     if (error.code === 11000) {
//       const field = Object.keys(error.keyValue)[0];
//       return res.status(400).json({ 
//         error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists!` 
//       });
//     }

//     res.status(500).json({ 
//       error: "Internal server error",
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// export default router;

import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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

export default router;
