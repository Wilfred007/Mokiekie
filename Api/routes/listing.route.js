import express from 'express';
import jwt from 'jsonwebtoken';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

const router = express.Router();

// Middleware to verify JWT token FROM COOKIES
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

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

// Create listing
router.post('/create', verifyToken, async (req, res) => {
  try {
    console.log('Create listing request:', req.body);
    console.log('User from token:', req.user);

    // Create listing with user reference
    const listing = await Listing.create({
      ...req.body,
      userRef: req.user.id, // Make sure userRef comes from authenticated user
    });
    
    return res.status(201).json(listing);
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).json({ 
      success: false,
      statusCode: 500,
      message: error.message 
    });
  }
});

// Get listings for a user
router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ error: 'You can only view your own listings!' });
    }

    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      statusCode: 500,
      message: error.message 
    });
  }
});

// Get single listing (public route - no auth needed)
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ 
        success: false,
        message: 'Listing not found!' 
      });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      statusCode: 500,
      message: error.message 
    });
  }
});

// Delete listing
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found!' });
    }

    if (req.user.id !== listing.userRef) {
      return res.status(401).json({ error: 'You can only delete your own listings!' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing has been deleted!' });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      statusCode: 500,
      message: error.message 
    });
  }
});

//Edit Listing
// router.edit('/edit/:id', verifyToken, async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.is);
//     if(!listing) {
//       return res.status(404).json({error: 'Listing not found'});
//     }
//     if (req.user.id !== listing.userRef) {
//       return  res.status
//     }
//   } catch (error) {
//     // res.status(200).json({message: 'Listing has been edited'})
//     res.status(500).json({
//       success: false,
//       statusCode: 500,
//       message: error.message
//     })
//   }
// })

router.post('/update/:id', verifyToken, async(req, res) => {
  const listing = await Listing.findById(req.params.id);
  if(!listing) {
    return next(errorHandler(404, 'Listing not found'))
  }

  if(req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your listing'));
  }

  try {
   const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
   );
   res.status(200).json(updatedListing)
  } catch (error) {
    next(error)
  }
})


router.get('/get/:id', async(req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error)
  }
})

export default router; 