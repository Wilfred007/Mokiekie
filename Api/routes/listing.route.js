


import express from 'express';
import jwt from 'jsonwebtoken';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

const router = express.Router();

// Middleware to verify JWT token FROM COOKIES
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// ----------------------------
// STATIC ROUTES FIRST
// ----------------------------

// Get listings with filters + pagination
router.get('/get', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    // Build dynamic filters
    const filter = {
      ...(searchTerm && { name: { $regex: searchTerm, $options: 'i' } }),
      ...(req.query.offer === 'true' && { offer: true }),
      ...(req.query.furnished === 'true' && { furnished: true }),
      ...(req.query.parking === 'true' && { parking: true }),
      ...(req.query.type && req.query.type !== 'all' && { type: req.query.type }),
    };

    const listings = await Listing.find(filter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
});

// Get listing by id (public route)
router.get('/:id', async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found!' });

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
});

// ----------------------------
// OTHER ROUTES (create, update, delete, etc.)
// ----------------------------

// Create listing
router.post('/create', verifyToken, async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      userRef: req.user.id,
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ success: false, statusCode: 500, message: error.message });
  }
});

// Update listing
router.put('/update/:id', verifyToken, async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, 'Listing not found'));
  if (req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only update your listing'));

  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
});

// router.get('/get', async (req, res, next) => {
//   try {
//     const listings = await Listing.find(); // Fetch all documents from Listing collection
//     res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// });

// Delete listing
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found!' });
    if (req.user.id !== listing.userRef) return res.status(401).json({ error: 'You can only delete your own listings!' });

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing has been deleted!' });
  } catch (error) {
    res.status(500).json({ success: false, statusCode: 500, message: error.message });
  }
});

export default router;
