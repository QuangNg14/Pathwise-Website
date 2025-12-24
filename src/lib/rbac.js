import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

// User roles
export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  USER: 'user'
};

// Permissions for each role
export const PERMISSIONS = {
  admin: [
    'create_post',
    'edit_post',
    'delete_post',
    'publish_post',
    'manage_users',
    'view_analytics'
  ],
  editor: [
    'create_post',
    'edit_post',
    'publish_post'
  ],
  user: [
    'view_posts',
    'comment'
  ]
};

/**
 * Get user role from MongoDB
 * @param {string} userId - Firebase user ID
 * @returns {Promise<string>} User role
 */
export async function getUserRole(userId) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ _id: userId });
    
    if (user) {
      return user.role || ROLES.USER;
    }
    
    // If user doesn't exist, create with default role
    await usersCollection.insertOne({
      _id: userId,
      role: ROLES.USER,
      createdAt: new Date()
    });
    
    return ROLES.USER;
  } catch (error) {
    console.error('Error getting user role:', error);
    return ROLES.USER;
  }
}

/**
 * Set user role in MongoDB
 * @param {string} userId - Firebase user ID
 * @param {string} role - Role to assign
 * @param {Object} additionalData - Additional user data
 */
export async function setUserRole(userId, role, additionalData = {}) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ _id: userId });
    
    if (user) {
      await usersCollection.updateOne(
        { _id: userId },
        {
          $set: {
            role,
            updatedAt: new Date(),
            ...additionalData
          }
        }
      );
    } else {
      await usersCollection.insertOne({
        _id: userId,
        role,
        createdAt: new Date(),
        ...additionalData
      });
    }
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
}

/**
 * Check if user has a specific permission
 * @param {string} role - User role
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  const rolePermissions = PERMISSIONS[role] || [];
  return rolePermissions.includes(permission);
}

/**
 * Check if user is admin
 * @param {string} role - User role
 * @returns {boolean}
 */
export function isAdmin(role) {
  return role === ROLES.ADMIN;
}

/**
 * Check if user is editor or above
 * @param {string} role - User role
 * @returns {boolean}
 */
export function isEditorOrAbove(role) {
  return role === ROLES.ADMIN || role === ROLES.EDITOR;
}

/**
 * Get all users with their roles
 * @returns {Promise<Array>} Array of users with roles
 */
export async function getAllUsers() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const usersCollection = db.collection('users');
    
    const users = await usersCollection.find({}).toArray();
    
    return users.map(user => ({
      id: user._id,
      ...user,
      _id: undefined
    }));
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

/**
 * Get users by role
 * @param {string} role - Role to filter by
 * @returns {Promise<Array>} Array of users with specified role
 */
export async function getUsersByRole(role) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const usersCollection = db.collection('users');
    
    const users = await usersCollection.find({ role }).toArray();
    
    return users.map(user => ({
      id: user._id,
      ...user,
      _id: undefined
    }));
  } catch (error) {
    console.error('Error getting users by role:', error);
    return [];
  }
}
