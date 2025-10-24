'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserRole, hasPermission, isAdmin, isEditorOrAbove } from '@/lib/rbac';

/**
 * Custom hook for role-based access control
 * @returns {Object} Role data and permission checking functions
 */
export function useRole() {
  const { currentUser } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (currentUser) {
        try {
          const userRole = await getUserRole(currentUser.uid);
          setRole(userRole);
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole('user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    }

    fetchRole();
  }, [currentUser]);

  return {
    role,
    loading,
    isAdmin: role ? isAdmin(role) : false,
    isEditor: role ? isEditorOrAbove(role) : false,
    hasPermission: (permission) => role ? hasPermission(role, permission) : false,
    canCreatePost: role ? hasPermission(role, 'create_post') : false,
    canEditPost: role ? hasPermission(role, 'edit_post') : false,
    canDeletePost: role ? hasPermission(role, 'delete_post') : false,
    canManageUsers: role ? hasPermission(role, 'manage_users') : false,
  };
}

