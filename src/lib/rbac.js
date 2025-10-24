import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

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
 * Get user role from Firestore
 * @param {string} userId - Firebase user ID
 * @returns {Promise<string>} User role
 */
export async function getUserRole(userId) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data().role || ROLES.USER;
    }
    
    // If user doesn't exist, create with default role
    await setDoc(userDocRef, {
      role: ROLES.USER,
      createdAt: new Date().toISOString()
    });
    
    return ROLES.USER;
  } catch (error) {
    console.error('Error getting user role:', error);
    return ROLES.USER;
  }
}

/**
 * Set user role in Firestore
 * @param {string} userId - Firebase user ID
 * @param {string} role - Role to assign
 * @param {Object} additionalData - Additional user data
 */
export async function setUserRole(userId, role, additionalData = {}) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        role,
        updatedAt: new Date().toISOString(),
        ...additionalData
      });
    } else {
      await setDoc(userDocRef, {
        role,
        createdAt: new Date().toISOString(),
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
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
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
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', role));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users by role:', error);
    return [];
  }
}

