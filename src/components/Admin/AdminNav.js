'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { FileText, Users, Settings, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import './AdminNav.css';

const AdminNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isEditor } = useRole();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: <Home size={20} />,
      show: true,
    },
    {
      path: '/admin/blog',
      label: 'Blog Posts',
      icon: <FileText size={20} />,
      show: isEditor || isAdmin,
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: <Users size={20} />,
      show: isAdmin,
    },
    {
      path: '/admin/setup',
      label: 'Setup',
      icon: <Settings size={20} />,
      show: true,
    },
  ];

  return (
    <nav className="admin-nav">
      <div className="admin-nav-content">
        <div className="admin-nav-brand">
          <h2>Admin Panel</h2>
        </div>
        
        <div className="admin-nav-links">
          {navItems
            .filter(item => item.show)
            .map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
        </div>

        <button onClick={handleLogout} className="nav-link logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;

