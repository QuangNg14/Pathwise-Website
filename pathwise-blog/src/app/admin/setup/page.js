'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { setUserRole, getAllUsers, ROLES } from '@/lib/rbac';
import './setup.css';

export default function AdminSetupPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSetupAdmin = async () => {
    if (!currentUser) {
      alert('You must be logged in!');
      return;
    }

    setLoading(true);

    try {
      await setUserRole(currentUser.uid, ROLES.ADMIN, {
        email: currentUser.email,
        displayName: currentUser.displayName || 'Admin',
        photoURL: currentUser.photoURL || null,
        setupAt: new Date().toISOString(),
      });

      setStatus('success');
      setMessage('Admin role assigned! Redirecting...');
      
      setTimeout(() => {
        window.location.href = '/admin/blog';
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Failed to setup admin. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="setup-page">
        <div className="setup-card">
          <h1>Please Login First</h1>
          <p>You need to be logged in to set up admin access.</p>
          <button onClick={() => window.location.href = '/'} className="setup-btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-page">
      <div className="setup-card">
        <h1>🎉 Admin Setup</h1>
        
        <div className="user-box">
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Name:</strong> {currentUser.displayName || 'User'}</p>
        </div>

        {status === 'success' && (
          <div className="success-message">
            ✅ {message}
          </div>
        )}

        {status === 'error' && (
          <div className="error-message">
            ❌ {message}
          </div>
        )}

        <button
          onClick={handleSetupAdmin}
          disabled={loading || status === 'success'}
          className="setup-btn primary"
        >
          {loading ? 'Setting up...' : 'Make Me Admin'}
        </button>

        <div className="info-box">
          <h3>What This Does:</h3>
          <p>✅ Makes you an admin</p>
          <p>✅ Lets you create blog posts</p>
          <p>✅ Gives you full access to the admin dashboard</p>
        </div>
      </div>
    </div>
  );
}

