import React, { useState } from "react";
import { Layout, Row, Col, Typography, Menu, Button, Drawer } from "antd";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

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
      }}
    >
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col xs={18} sm={18} md={10} lg={10}>
          <Title level={3} style={{ margin: 0, color: "var(--primary-color)" }}>
            <Link
              href="/"
              passHref
              style={{ margin: 0, color: "var(--primary-color)" }}
            >
              PATHWISE
            </Link>
          </Title>
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
        <Col xs={6} sm={6} md={0} lg={0}>
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
