import React, { useState } from "react";
import { Layout, Row, Col, Menu, Button, Drawer } from "antd";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent = ({ current, handleClick }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        backgroundColor: "white",
        height: "70px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col xs={18} sm={18} md={10} lg={10}>
          <Link href="/" passHref>
            <div className="logo-container">
              <img
                src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730672180/xywohx68q89slpnh7kho.png"
                // className="logo-image" // This class applies the height adjustment
                height={150}
                className="logo-image"
                alt="Pathwise Logo"
              />
            </div>
          </Link>
        </Col>

        {/* Desktop Menu */}
        <Col xs={0} sm={0} md={14} lg={14}>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[current]}
            onClick={handleClick}
            style={{
              borderBottom: "none",
              justifyContent: "flex-end",
              fontWeight: 400,
              fontSize: 16,
              color: "var(--primary-color)",
            }}
          >
            {[
              "activities",
              "services",
              "results",
              "apply",
              // "about",
              "blog",
              "contact",
            ].map((key) => (
              <Menu.Item
                key={key}
                style={{ borderBottom: "none", marginRight: "20px" }}
              >
                <Link href={`/${key === "home" ? "" : key}`} passHref>
                  <span
                    style={{
                      color:
                        current === key ? "var(--primary-color)" : "inherit",
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>

        {/* Mobile Menu Button */}
        <Col xs={6} sm={6} md={0} lg={0}>
          <Button
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "var(--primary-color)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              marginLeft: 20,
            }}
          />
        </Col>
      </Row>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="PATHWISE"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[current]}
          onClick={handleClick}
          style={{ borderRight: "none" }}
        >
          {[
            "activities",
            "services",
            "results",
            "apply",
            // "about",
            "blog",
            "contact",
          ].map((key) => (
            <Menu.Item key={key} onClick={closeDrawer}>
              <Link href={`/${key === "home" ? "" : key}`} passHref>
                <span
                  style={{
                    color: current === key ? "var(--primary-color)" : "inherit",
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
