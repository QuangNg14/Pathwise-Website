"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/Auth/UserMenu";
import AuthModal from "@/components/Auth/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import "./Header.css";
import "../Auth/Auth.css";

const Header = ({ current }) => {
  const { currentUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const items = [
    {
      label: (
        <Link href="https://www.thepathwise.org/" target="_blank">
          Main Site
        </Link>
      ),
      key: "main",
    },
    {
      label: (
        <Link href="https://www.thepathwise.org/contact" target="_blank">
          Contact
        </Link>
      ),
      key: "contact",
    },
  ];

  const openLoginModal = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="blog-header">
        <div className="header-container">
          <Link
            href="https://www.facebook.com/groups/756561709660282"
            target="_blank"
            className="logo"
          >
            <h1>
              Pathwise Network Vietnam
              <ExportOutlined
                style={{
                  fontSize: "14px",
                  marginLeft: "8px",
                  verticalAlign: "middle",
                  opacity: 0.7,
                }}
              />
            </h1>
          </Link>
          <div className="header-actions">
            <Menu
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
              className="header-menu"
            />
            <ThemeToggle />
            {currentUser ? (
              <UserMenu />
            ) : (
              <div className="login-signup-buttons">
                <Button className="login-button" onClick={openLoginModal}>
                  Login
                </Button>
                <Button className="signup-button" onClick={openSignupModal}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Header;
