// middleware/verifyToken.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function verifyToken(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.id // or payload.userId depending on your auth
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// // middleware/auth.js
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';
// import { errorHandler } from '../utils/error.js';

// // Basic authentication middleware
// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return next(errorHandler(401, 'Access token required'));
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return next(errorHandler(401, 'User not found'));
//     }

//     if (!user.isActive) {
//       return next(errorHandler(403, 'Account is inactive'));
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return next(errorHandler(401, 'Invalid token'));
//     }
//     if (error.name === 'TokenExpiredError') {
//       return next(errorHandler(401, 'Token expired'));
//     }
//     next(error);
//   }
// };

// // Middleware to check if user has required role
// export const requireRole = (requiredRole) => {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return next(errorHandler(401, 'Authentication required'));
//       }

//       if (!req.user.hasRole(requiredRole)) {
//         return next(errorHandler(403, `Access denied. ${requiredRole} role required.`));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Middleware to check if user has required role level or higher
// export const requireRoleLevel = (requiredRole) => {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return next(errorHandler(401, 'Authentication required'));
//       }

//       if (!req.user.hasRoleLevel(requiredRole)) {
//         return next(errorHandler(403, `Access denied. ${requiredRole} level or higher required.`));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Middleware to check if user has specific permission
// export const requirePermission = (permission) => {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return next(errorHandler(401, 'Authentication required'));
//       }

//       if (!req.user.hasPermission(permission)) {
//         return next(errorHandler(403, `Access denied. Permission '${permission}' required.`));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Middleware to check multiple permissions (user must have ALL)
// export const requireAllPermissions = (permissions) => {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return next(errorHandler(401, 'Authentication required'));
//       }

//       const hasAllPermissions = permissions.every(permission => 
//         req.user.hasPermission(permission)
//       );

//       if (!hasAllPermissions) {
//         return next(errorHandler(403, `Access denied. Required permissions: ${permissions.join(', ')}`));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Middleware to check if user has ANY of the specified permissions
// export const requireAnyPermission = (permissions) => {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return next(errorHandler(401, 'Authentication required'));
//       }

//       const hasAnyPermission = permissions.some(permission => 
//         req.user.hasPermission(permission)
//       );

//       if (!hasAnyPermission) {
//         return next(errorHandler(403, `Access denied. Required permissions (any): ${permissions.join(', ')}`));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Middleware to check if user can access their own resource or has permission
// export const requireOwnershipOrPermission = (permission, getUserIdFromParam = 'id') => {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return next(errorHandler(401, 'Authentication required'));
//       }

//       const resourceUserId = req.params[getUserIdFromParam];
//       const isOwner = req.user.id === resourceUserId;
//       const hasPermission = req.user.hasPermission(permission);

//       if (!isOwner && !hasPermission) {
//         return next(errorHandler(403, 'Access denied. You can only access your own resources.'));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Optional: Middleware to log user actions for audit
// export const logUserAction = (action) => {
//   return (req, res, next) => {
//     try {
//       if (req.user) {
//         console.log(`[${new Date().toISOString()}] ${req.user.username} (${req.user.role}) performed: ${action}`);
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };