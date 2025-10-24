'use client';
import { useState } from 'react';
import { Button, Dropdown, Avatar, message } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const UserMenu = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      message.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      message.error(error?.message || 'Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (!currentUser) return null;

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={['click']}
      className="user-menu"
    >
      <Button type="text" className="user-button">
        <Avatar 
          src={currentUser.photoURL} 
          icon={<UserOutlined />}
          size="small"
        />
        <span className="user-name">
          {currentUser.displayName || currentUser.email?.split('@')[0]}
        </span>
      </Button>
    </Dropdown>
  );
};

export default UserMenu;

