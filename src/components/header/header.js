// components/HeaderComponent.jsx
import React, { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { navigateToApplication } from "@/utils/navigation";
import "./header.css";

const { Header } = Layout;

const menuItems = [
  "program",
  "services",
  "results",
  "blog",
  "about",
  "contact",
];

export default function HeaderComponent() {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

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
            src="/images/Pathwise Logo Black.png"
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

            <button onClick={handleApplyClick} className="register-menu-item">
              Apply
            </button>
          </nav>
        )}

        {/* Mobile burger menu button */}
        {isMobile && (
          <div className="menu-button-col">
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
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
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

            <button onClick={handleApplyClick} className="drawer-register">
              Apply
            </button>
          </nav>
        </Drawer>
      )}
    </Header>
  );
}
