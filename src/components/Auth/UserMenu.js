'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dropdown, Avatar, message } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const UserMenu = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      message.success('Logged out successfully!');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      message.error(error?.message || 'Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') {
      router.push('/profile');
    } else if (key === 'settings') {
      router.push('/settings');
    }
  };

  const items = [
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






