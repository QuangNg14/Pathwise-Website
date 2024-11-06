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
        height: "80px", // Increased height to accommodate larger logo
        display: "flex",
        alignItems: "center", // Center items vertically
        padding: "0 20px",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ width: "100%" }}
        gutter={16}
      >
        {/* Logo Column */}
        <Col
          xs={18}
          sm={18}
          md={10}
          lg={10}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link href="/" passHref>
            <img
              src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730672180/xywohx68q89slpnh7kho.png"
              style={{ height: "150px", width: "auto", marginLeft: 40 }} // Adjusted logo size
              alt="Pathwise Logo"
            />
          </Link>
        </Col>

        {/* Desktop Menu */}
        <Col
          xs={0}
          sm={0}
          md={14}
          lg={14}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[current]}
            onClick={handleClick}
            style={{
              borderBottom: "none",
              fontWeight: 400,
              fontSize: 16,
              color: "var(--primary-color)",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            {[
              "home",
              "activities",
              "services",
              "results",
              "about",
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
        <Col xs={6} sm={6} md={0} lg={0} className="menu-button-col">
          <Button
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "var(--primary-color)",
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
            "home",
            "activities",
            "services",
            "results",
            "about",
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
