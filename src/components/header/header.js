import React from "react";
import { Layout, Row, Col, Typography, Menu } from "antd";
import Link from "next/link"; // Import Link from next/link

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent = ({ current, handleClick }) => (
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
    <Row style={{ width: "100%" }}>
      <Col
        span={10}
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
        }}
      >
        <Title level={3} style={{ margin: 0, color: "var(--primary-color)" }}>
          <Link href="/" passHref style={{ color: "var(--primary-color)" }}>
            PATHWISE
          </Link>
        </Title>
      </Col>
      <Col span={14}>
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
          <Menu.Item
            key="home"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            <Link href="/" passHref>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item
            key="activities"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            <Link href="/activities" passHref>
              What we do
            </Link>
          </Menu.Item>
          <Menu.Item
            key="services"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            <Link href="/services" passHref>
              Services
            </Link>
          </Menu.Item>
          <Menu.Item
            key="results"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            <Link href="/results" passHref>
              Results
            </Link>
          </Menu.Item>
          <Menu.Item
            key="about"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            <Link href="/about" passHref>
              About Us
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </Header>
);

export default HeaderComponent;
