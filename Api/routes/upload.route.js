import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const router = express.Router();

// Configure multer with file size limit and file type validation
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log("File filter - file:", file); // Debug log
    // Check file type
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Cloudinary will be configured inside the route handler

// Upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log("Upload route hit!"); // Debug log
  console.log("Request file:", req.file); // Debug log
  
  try {
    // Configure Cloudinary HERE (after env vars are loaded)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "EXISTS" : "MISSING",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "EXISTS" : "MISSING"
    });

    // Check if file was uploaded
    if (!req.file) {
      console.log("No file uploaded"); // Debug log
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File path:", req.file.path); // Debug log
    const filePath = req.file.path;
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log("File doesn't exist at path:", filePath); // Debug log
      return res.status(400).json({ error: "Uploaded file not found" });
    }
    
    console.log("Starting Cloudinary upload..."); // Debug log
    
    // Upload to Cloudinary with additional options
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "profile_pictures", // Organized folder structure
      transformation: [
        { width: 400, height: 400, crop: "fill" }, // Resize and crop to square
        { quality: "auto" }, // Optimize quality
        { format: "auto" } // Optimize format
      ],
      public_id: `profile_${Date.now()}`, // Unique identifier
    });

    console.log("Cloudinary upload successful:", result.secure_url); // Debug log

    // Remove local temp file
    fs.unlinkSync(filePath);

    // Return the secure URL
    res.json({ 
      url: result.secure_url,
      public_id: result.public_id,
      message: "Image uploaded successfully"
    });

  } catch (error) {
    console.error("Upload error details:", error); // Debug log
    
    // Clean up temp file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Error cleaning up temp file:", cleanupError);
      }
    }

    // Handle specific errors
    if (error.message.includes('File too large') || error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File size too large. Maximum size is 4MB." });
    }
    
    if (error.message.includes('Only image files are allowed')) {
      return res.status(400).json({ error: "Only image files are allowed!" });
    }

    // Generic error response
    res.status(500).json({ 
      error: "Failed to upload image. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Test route to check if routes are working
router.get("/test", (req, res) => {
  res.json({ message: "Upload routes are working!" });
});

export default router;