"use client";
// components/HeaderComponent.jsx
import React, { useState, useEffect } from "react";
import { Layout, Drawer, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { navigateToApplication } from "@/utils/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import AuthModal from "@/components/Auth/AuthModal";
import UserMenu from "@/components/Auth/UserMenu";
import ThemeToggle from "@/components/ThemeToggle";
import "./header.css";

const { Header } = Layout;

const menuItems = ["program", "services", "results", "about", "contact"];

// Blog is now integrated into the main site at /blog

export default function HeaderComponent() {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleApplyClick = (e) => {
    e.preventDefault();
    navigateToApplication(router);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  return (
    <Header className="custom-header">
      <div className="header-row">
        {/* Logo on the far left */}
        <Link href="/" className="logo-container">
          <img
            src={
              theme === "dark"
                ? "/images/Pathwise Logo White.png"
                : "/images/Pathwise Logo Black.png"
            }
            alt="Pathwise Logo"
            className="header-logo-image"
          />
        </Link>

        {/* Desktop menu and register button on the right */}
        {!isMobile && (
          <nav className="custom-menu">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={item === "home" ? "/" : `/${item}`}
                className="custom-menu-item"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            {/* Blog Link - Internal navigation to /blog */}
            <Link href="/blog" className="custom-menu-item">
              Blog
            </Link>

            <ThemeToggle />

            {currentUser ? (
              <UserMenu />
            ) : (
              <Button
                onClick={() => setAuthModalVisible(true)}
                className="login-menu-item"
                icon={<UserOutlined />}
              >
                Login
              </Button>
            )}

            <button onClick={handleApplyClick} className="register-menu-item">
              Apply
            </button>
          </nav>
        )}

        {/* Mobile burger menu button */}
        {isMobile && (
          <div className="mobile-header-actions">
            <button
              onClick={handleApplyClick}
              className="mobile-apply-btn"
              aria-label="Apply for mentorship"
            >
              Apply
            </button>
            <button
              className="burger-btn"
              onClick={() => setDrawerVisible(true)}
              aria-label="Open navigation menu"
            >
              <MenuOutlined />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          styles={{ body: { padding: 0 } }}
          width={280}
        >
          <nav className="drawer-nav">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={item === "home" ? "/" : `/${item}`}
                className="drawer-link"
                onClick={() => setDrawerVisible(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            {/* Blog Link - Internal navigation to /blog */}
            <Link
              href="/blog"
              className="drawer-link"
              onClick={() => setDrawerVisible(false)}
            >
              Blog
            </Link>

            {currentUser ? (
              <div className="drawer-user-section">
                <div className="drawer-user-info">
                  <UserOutlined />
                  <span>
                    {currentUser.displayName ||
                      currentUser.email?.split("@")[0]}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    /* Add logout logic */
                  }}
                  className="drawer-logout"
                  size="small"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setAuthModalVisible(true);
                  setDrawerVisible(false);
                }}
                className="drawer-login"
                icon={<UserOutlined />}
                block
              >
                Login
              </Button>
            )}

            <button onClick={handleApplyClick} className="drawer-register">
              Apply
            </button>
          </nav>
        </Drawer>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
      />
    </Header>
  );
}
