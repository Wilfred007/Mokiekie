import listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler} from '../utils/error.js'

export const test = (req, res) => {
    res.json({
        message: 'Hello World'
    });
}



export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your own account'));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
};
export const getUserListings = async (req, res, next) => {
    try {
        const listings = await listing.find({ userRef: String(req.user.id) });
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) return next(errorHandler(404, 'User not found'));
    
        const { password: pass, ...rest} = user._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
        
    }
   
}


// import listing from "../models/listing.model.js";
// import User from "../models/user.model.js";
// import { errorHandler } from '../utils/error.js';

// export const test = (req, res) => {
//   res.json({
//     message: 'Hello World'
//   });
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     // Check if user is trying to delete their own account OR is an admin
//     const isOwnAccount = req.user.id === req.params.id;
//     const canDeleteAnyUser = req.user.hasPermission('manage_users');

//     if (!isOwnAccount && !canDeleteAnyUser) {
//       return next(errorHandler(403, 'You can only delete your own account'));
//     }

//     // Prevent deletion of the last admin (optional safety check)
//     if (canDeleteAnyUser && !isOwnAccount) {
//       const targetUser = await User.findById(req.params.id);
//       if (!targetUser) {
//         return next(errorHandler(404, 'User not found'));
//       }
      
//       // Prevent admin from deleting another admin (optional)
//       if (targetUser.isAdmin() && !req.user.isAdmin()) {
//         return next(errorHandler(403, 'Cannot delete admin user'));
//       }
//     }

//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json('User has been deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUserListings = async (req, res, next) => {
//   try {
//     const targetUserId = req.params.id || req.user.id;
    
//     // Check if user can view listings
//     const isOwnListings = req.user.id === targetUserId;
//     const canViewAnyListings = req.user.hasRoleLevel('moderator');

//     if (!isOwnListings && !canViewAnyListings) {
//       return next(errorHandler(403, 'You can only view your own listings'));
//     }

//     const listings = await listing.find({ userRef: String(targetUserId) });
//     res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUser = async (req, res, next) => {
//   try {
//     const targetUserId = req.params.id;
    
//     // Check if user can view user info
//     const isOwnInfo = req.user.id === targetUserId;
//     const canViewAnyUser = req.user.hasRoleLevel('moderator');

//     if (!isOwnInfo && !canViewAnyUser) {
//       return next(errorHandler(403, 'You can only view your own profile'));
//     }

//     const user = await User.findById(targetUserId);
//     if (!user) return next(errorHandler(404, 'User not found'));

//     // Return different info based on permissions
//     const { password: pass, ...rest } = user._doc;
    
//     // If viewing someone else's profile and not admin, limit info
//     if (!isOwnInfo && !req.user.isAdmin()) {
//       const { email, ...publicInfo } = rest;
//       return res.status(200).json(publicInfo);
//     }

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// // New controller functions with role-based access

// export const updateUser = async (req, res, next) => {
//   try {
//     const targetUserId = req.params.id;
//     const isOwnAccount = req.user.id === targetUserId;
//     const canManageUsers = req.user.hasPermission('manage_users');

//     if (!isOwnAccount && !canManageUsers) {
//       return next(errorHandler(403, 'You can only update your own account'));
//     }

//     // Prevent role changes unless admin
//     if (req.body.role && !req.user.isAdmin()) {
//       return next(errorHandler(403, 'Only admins can change user roles'));
//     }

//     // Prevent users from making themselves admin
//     if (req.body.role === 'admin' && isOwnAccount && !req.user.isAdmin()) {
//       return next(errorHandler(403, 'Cannot promote yourself to admin'));
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       targetUserId,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           avatar: req.body.avatar,
//           ...(req.user.isAdmin() && { role: req.body.role }),
//           ...(req.user.hasPermission('manage_users') && { isActive: req.body.isActive })
//         }
//       },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllUsers = async (req, res, next) => {
//   try {
//     // Only moderators and admins can view all users
//     if (!req.user.hasRoleLevel('moderator')) {
//       return next(errorHandler(403, 'Access denied. Moderator level required.'));
//     }

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const users = await User.find({})
//       .select('-password')
//       .skip(skip)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     const total = await User.countDocuments();

//     res.status(200).json({
//       users,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateUserRole = async (req, res, next) => {
//   try {
//     // Only admins can change roles
//     if (!req.user.isAdmin()) {
//       return next(errorHandler(403, 'Only admins can change user roles'));
//     }

//     const { role } = req.body;
//     const targetUserId = req.params.id;

//     if (!['user', 'moderator', 'admin'].includes(role)) {
//       return next(errorHandler(400, 'Invalid role'));
//     }

//     // Prevent changing own role
//     if (req.user.id === targetUserId) {
//       return next(errorHandler(403, 'Cannot change your own role'));
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       targetUserId,
//       { role },
//       { new: true }
//     ).select('-password');

//     if (!updatedUser) {
//       return next(errorHandler(404, 'User not found'));
//     }

//     res.status(200).json({
//       message: `User role updated to ${role}`,
//       user: updatedUser
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const toggleUserStatus = async (req, res, next) => {
//   try {
//     // Only moderators and admins can toggle user status
//     if (!req.user.hasRoleLevel('moderator')) {
//       return next(errorHandler(403, 'Access denied. Moderator level required.'));
//     }

//     const targetUserId = req.params.id;
    
//     // Prevent moderators from affecting admins
//     const targetUser = await User.findById(targetUserId);
//     if (!targetUser) {
//       return next(errorHandler(404, 'User not found'));
//     }

//     if (targetUser.isAdmin() && !req.user.isAdmin()) {
//       return next(errorHandler(403, 'Cannot modify admin user status'));
//     }

//     // Prevent affecting own account
//     if (req.user.id === targetUserId) {
//       return next(errorHandler(403, 'Cannot change your own status'));
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       targetUserId,
//       { isActive: !targetUser.isActive },
//       { new: true }
//     ).select('-password');

//     res.status(200).json({
//       message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'}`,
//       user: updatedUser
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUserPermissions = async (req, res, next) => {
//   try {
//     const targetUserId = req.params.id;
//     const isOwnInfo = req.user.id === targetUserId;
//     const canViewAnyUser = req.user.hasRoleLevel('moderator');

//     if (!isOwnInfo && !canViewAnyUser) {
//       return next(errorHandler(403, 'You can only view your own permissions'));
//     }

//     const user = await User.findById(targetUserId);
//     if (!user) return next(errorHandler(404, 'User not found'));

//     res.status(200).json({
//       userId: user._id,
//       username: user.username,
//       role: user.role,
//       permissions: user.getPermissions(),
//       isActive: user.isActive
//     });
//   } catch (error) {
//     next(error);
//   }
// };
