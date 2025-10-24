'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { getAllUsers, setUserRole, ROLES } from '@/lib/rbac';
import AdminNav from '@/components/Admin/AdminNav';
import { Shield, UserCheck, User, RefreshCw, Crown, Edit2, AlertCircle } from 'lucide-react';
import './users.css';

export default function UsersManagementPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { isAdmin, loading: roleLoading } = useRole();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, roleLoading, router]);

  useEffect(() => {
    if (currentUser && isAdmin) {
      fetchUsers();
    }
  }, [currentUser, isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      setUpdating(userId);
      await setUserRole(userId, newRole);
      alert('User role updated successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return <Crown size={18} color="#dc3545" />;
      case ROLES.EDITOR:
        return <Edit2 size={18} color="#ffc107" />;
      default:
        return <User size={18} color="#6c757d" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return 'admin-badge';
      case ROLES.EDITOR:
        return 'editor-badge';
      default:
        return 'user-badge';
    }
  };

  if (roleLoading || !currentUser) {
    return (
      <div className="users-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <AdminNav />
        <div className="users-page">
          <div className="access-denied">
          <AlertCircle size={64} color="#dc3545" />
          <h1>Access Denied</h1>
          <p>You need admin privileges to access this page.</p>
          <button onClick={() => router.push('/')} className="back-btn">
            Go to Home
          </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNav />
      <div className="users-page">
      <div className="users-container">
        <div className="users-header">
          <div className="header-left">
            <Shield size={32} />
            <div>
              <h1>User Management</h1>
              <p>Manage user roles and permissions</p>
            </div>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="refresh-btn"
          >
            <RefreshCw size={20} className={loading ? 'spinning' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="role-legend">
          <h3>Role Permissions:</h3>
          <div className="legend-items">
            <div className="legend-item">
              <Crown size={18} color="#dc3545" />
              <span><strong>Admin:</strong> Full access - Create/Edit/Delete posts, Manage users</span>
            </div>
            <div className="legend-item">
              <Edit2 size={18} color="#ffc107" />
              <span><strong>Editor:</strong> Create/Edit/Publish posts</span>
            </div>
            <div className="legend-item">
              <User size={18} color="#6c757d" />
              <span><strong>User:</strong> View posts, Comment</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <User size={48} color="#6c757d" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} />
                    ) : (
                      <div className="avatar-placeholder">
                        {(user.displayName || user.email || 'U')?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="user-details">
                    <h3>{user.displayName || 'Unnamed User'}</h3>
                    <p className="user-email">{user.email || user.id}</p>
                    {user.createdAt && (
                      <p className="user-date">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="user-role">
                  <div className={`role-badge ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    <span>{user.role || 'user'}</span>
                  </div>

                  {user.id !== currentUser.uid && (
                    <select
                      value={user.role || ROLES.USER}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={updating === user.id}
                      className="role-select"
                    >
                      <option value={ROLES.USER}>User</option>
                      <option value={ROLES.EDITOR}>Editor</option>
                      <option value={ROLES.ADMIN}>Admin</option>
                    </select>
                  )}

                  {user.id === currentUser.uid && (
                    <span className="current-user-label">(You)</span>
                  )}
                </div>

                {updating === user.id && (
                  <div className="updating-overlay">
                    <div className="spinner-small"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="users-footer">
          <p>
            Total Users: <strong>{users.length}</strong>
            {' | '}
            Admins: <strong>{users.filter(u => u.role === ROLES.ADMIN).length}</strong>
            {' | '}
            Editors: <strong>{users.filter(u => u.role === ROLES.EDITOR).length}</strong>
          </p>
        </div>
      </div>
    </>
  );
}

