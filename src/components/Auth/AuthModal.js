'use client';
import { useState } from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={450}
      centered
      className="auth-modal"
    >
      <div className="auth-modal-content">
        <button className="auth-close-btn" onClick={onClose}>
          <CloseOutlined />
        </button>
        
        {isLogin ? (
          <Login onClose={onClose} switchToSignup={switchToSignup} />
        ) : (
          <Signup onClose={onClose} switchToLogin={switchToLogin} />
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;







