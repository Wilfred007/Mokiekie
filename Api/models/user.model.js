import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s",
    },
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);

export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s",
//     },
//     role: {
//       type: String,
//       enum: ['user', 'moderator', 'admin'],
//       default: 'user'
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   },
//   { timestamps: true }
// );

// // Define role permissions
// const rolePermissions = {
//   user: [
//     'read_posts',
//     'create_posts',
//     'edit_own_posts',
//     'delete_own_posts'
//   ],
//   moderator: [
//     'read_posts',
//     'create_posts',
//     'edit_own_posts',
//     'delete_own_posts',
//     'edit_any_posts',
//     'delete_any_posts',
//     'moderate_comments',
//     'ban_users'
//   ],
//   admin: [
//     'read_posts',
//     'create_posts',
//     'edit_own_posts',
//     'delete_own_posts',
//     'edit_any_posts',
//     'delete_any_posts',
//     'moderate_comments',
//     'ban_users',
//     'manage_users',
//     'manage_roles',
//     'system_settings'
//   ]
// };

// // Instance method to check if user has a specific permission
// userSchema.methods.hasPermission = function(permission) {
//   if (!this.isActive) return false;
//   const permissions = rolePermissions[this.role] || [];
//   return permissions.includes(permission);
// };

// // Instance method to check if user has a specific role
// userSchema.methods.hasRole = function(role) {
//   return this.role === role;
// };

// // Instance method to check if user has role level or higher
// userSchema.methods.hasRoleLevel = function(requiredRole) {
//   const roleLevels = { user: 1, moderator: 2, admin: 3 };
//   const userLevel = roleLevels[this.role] || 0;
//   const requiredLevel = roleLevels[requiredRole] || 0;
//   return userLevel >= requiredLevel;
// };

// // Instance method to get all permissions for the user
// userSchema.methods.getPermissions = function() {
//   if (!this.isActive) return [];
//   return rolePermissions[this.role] || [];
// };

// // Convenient role check methods
// userSchema.methods.isUser = function() {
//   return this.role === 'user';
// };

// userSchema.methods.isModerator = function() {
//   return this.role === 'moderator';
// };

// userSchema.methods.isAdmin = function() {
//   return this.role === 'admin';
// };

// userSchema.methods.isModeratorOrAdmin = function() {
//   return ['moderator', 'admin'].includes(this.role);
// };

// // Instance method to check if user can perform action on resource
// userSchema.methods.canEdit = function(resource) {
//   if (!this.isActive) return false;
  
//   // Admin can edit anything
//   if (this.isAdmin()) return true;
  
//   // Moderator can edit any posts
//   if (this.isModerator() && this.hasPermission('edit_any_posts')) return true;
  
//   // User can edit their own content
//   if (resource.userId && resource.userId.toString() === this._id.toString()) {
//     return this.hasPermission('edit_own_posts');
//   }
  
//   return false;
// };

// userSchema.methods.canDelete = function(resource) {
//   if (!this.isActive) return false;
  
//   // Admin can delete anything
//   if (this.isAdmin()) return true;
  
//   // Moderator can delete any posts
//   if (this.isModerator() && this.hasPermission('delete_any_posts')) return true;
  
//   // User can delete their own content
//   if (resource.userId && resource.userId.toString() === this._id.toString()) {
//     return this.hasPermission('delete_own_posts');
//   }
  
//   return false;
// };

// const User = mongoose.model("User", userSchema);
// export default User;