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
 * Get user role via API
 * @param {string} userId - Firebase user ID
 * @returns {Promise<string>} User role
 */
export async function getUserRole(userId) {
  try {
    const response = await fetch(`/api/users/role?userId=${userId}`);
    const data = await response.json();
    
    if (data.success) {
      return data.role || ROLES.USER;
    }
    
    return ROLES.USER;
  } catch (error) {
    console.error('Error getting user role:', error);
    return ROLES.USER;
  }
}

/**
 * Set user role via API
 * @param {string} userId - Firebase user ID
 * @param {string} role - Role to assign
 * @param {Object} additionalData - Additional user data
 */
export async function setUserRole(userId, role, additionalData = {}) {
  try {
    const response = await fetch('/api/users/set-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role, additionalData }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to set user role');
    }
    
    return data;
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
}

/**
 * Get all users via API
 * @returns {Promise<Array>} Array of users with roles
 */
export async function getAllUsers() {
  try {
    const response = await fetch('/api/users/all');
    const data = await response.json();
    
    if (data.success) {
      return data.users || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
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

