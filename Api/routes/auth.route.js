import express from 'express';
import { google, signin, signup, signout, forgotPassword } from '../controllers/auth.controller.js';




const router = express.Router();


router.post("/signup", signup)
router.post("/signin", signin)
router.post('/google', google)
router.get('/signout', signout)

router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);



export default router;


// import express from 'express';
// import {
//   signup,
//   signin,
//   google,
//   signOut,
//   refreshToken,
//   createUserWithRole
// } from '../controllers/auth.controller.js';
// import { verifyToken, requireRole } from '../middleware/verifyToken.js';

// const router = express.Router();

// // Public routes
// router.post('/signup', signup);
// router.post('/signin', signin);
// router.post('/google', google);
// router.post('/signout', signOut);

// // Protected routes
// router.post('/refresh', refreshToken);

// // Admin only routes
// router.post('/create-user', verifyToken, requireRole('admin'), createUserWithRole);

// export default router;