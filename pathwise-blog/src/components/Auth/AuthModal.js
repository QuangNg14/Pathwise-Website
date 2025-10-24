'use client';
import { useState } from 'react';
import { Modal } from 'antd';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);

  const handleClose = () => {
    onClose();
    // Reset to default mode after a short delay
    setTimeout(() => setMode('login'), 300);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={460}
      className="auth-modal"
      centered
    >
      {mode === 'login' ? (
        <Login 
          onClose={handleClose} 
          switchToSignup={() => setMode('signup')}
        />
      ) : (
        <Signup 
          onClose={handleClose} 
          switchToLogin={() => setMode('login')}
        />
      )}
    </Modal>
  );
};

export default AuthModal;


