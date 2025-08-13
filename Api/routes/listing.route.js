// import express from "express";
// import { createListing } from "../controllers/listing.controller.js";


// const router = express.Router();

// const verifyToken = (req, res, next) => {
//   // Check Authorization header first, then cookies
//   const token =
//     req.headers.authorization?.split(" ")[1] || req.cookies.access_token;

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


// router.post('/create', verifyToken, createListing)


// export default router;

import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

// Make sure we can read cookies
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
    // Verify token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded payload for later use
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Protected route to create a listing
router.post("/create", verifyToken, createListing);

export default router;
