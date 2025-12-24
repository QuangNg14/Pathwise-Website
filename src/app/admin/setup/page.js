'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { setUserRole, getAllUsers, ROLES } from '@/lib/rbac-client';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import './setup.css';

export default function AdminSetupPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, checking, success, error
  const [message, setMessage] = useState('');
  const [existingAdmins, setExistingAdmins] = useState([]);

  useEffect(() => {
    if (currentUser) {
      checkExistingAdmins();
    }
  }, [currentUser]);

  const checkExistingAdmins = async () => {
    try {
      setStatus('checking');
      const users = await getAllUsers();
      const admins = users.filter(user => user.role === ROLES.ADMIN);
      setExistingAdmins(admins);
      
      if (admins.length > 0) {
        setStatus('idle');
        setMessage(`There are already ${admins.length} admin(s) in the system.`);
      } else {
        setStatus('idle');
        setMessage('No admins found. You can set yourself as the first admin.');
      }
    } catch (error) {
      console.error('Error checking admins:', error);
      setStatus('error');
      setMessage('Error checking existing admins');
    }
  };

  const handleSetupAdmin = async () => {
    if (!currentUser) {
      setStatus('error');
      setMessage('You must be logged in to set up admin access');
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      await setUserRole(currentUser.uid, ROLES.ADMIN, {
        email: currentUser.email,
        displayName: currentUser.displayName || 'Admin',
        photoURL: currentUser.photoURL || null,
        setupAt: new Date().toISOString(),
      });

      setStatus('success');
      setMessage('Admin role successfully assigned! You now have full access to the admin dashboard.');
      
      // Refresh the page after 2 seconds to update the role
      setTimeout(() => {
        window.location.href = '/admin/blog';
      }, 2000);
    } catch (error) {
      console.error('Error setting up admin:', error);
      setStatus('error');
      setMessage('Failed to set up admin role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="setup-page">
        <div className="setup-container">
          <div className="setup-card">
            <AlertCircle size={48} color="#dc3545" />
            <h1>Authentication Required</h1>
            <p>Please log in to set up admin access.</p>
            <button onClick={() => window.location.href = '/'} className="setup-btn">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-page">
      <div className="setup-container">
        <div className="setup-card">
          <Shield size={64} color="#1877f2" />
          <h1>Admin Setup</h1>
          
          <div className="user-info-box">
            <div className="user-avatar">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User" />
              ) : (
                <div className="avatar-placeholder">
                  {(currentUser.displayName || currentUser.email)?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="user-name">{currentUser.displayName || 'User'}</p>
              <p className="user-email">{currentUser.email}</p>
            </div>
          </div>

          {status === 'checking' && (
            <div className="status-message info">
              <div className="spinner-small"></div>
              <p>Checking existing admins...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="status-message success">
              <CheckCircle size={24} />
              <p>{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="status-message error">
              <AlertCircle size={24} />
              <p>{message}</p>
            </div>
          )}

          {status === 'idle' && message && (
            <div className={`status-message ${existingAdmins.length > 0 ? 'warning' : 'info'}`}>
              <p>{message}</p>
            </div>
          )}

          {existingAdmins.length > 0 && (
            <div className="existing-admins">
              <h3>Existing Admins:</h3>
              <ul>
                {existingAdmins.map((admin) => (
                  <li key={admin.id}>
                    {admin.displayName || admin.email || admin.id}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="setup-actions">
            <button
              onClick={handleSetupAdmin}
              disabled={loading || status === 'success'}
              className="setup-btn primary"
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  <span>Setting up...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Make Me Admin</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => window.location.href = '/admin/blog'}
              className="setup-btn secondary"
            >
              Go to Admin Dashboard
            </button>
          </div>

          <div className="setup-info">
            <h3>What is Admin Setup?</h3>
            <p>
              This page allows you to grant yourself admin privileges. As an admin, you will be able to:
            </p>
            <ul>
              <li>Create and publish blog posts</li>
              <li>Edit and delete existing posts</li>
              <li>Manage user roles and permissions</li>
              <li>Access analytics and admin tools</li>
            </ul>
            <p className="warning-text">
              <strong>⚠️ Important:</strong> Only grant admin access to trusted users. Admins have full control over the blog content and user management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

