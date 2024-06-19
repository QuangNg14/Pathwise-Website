import React from "react";
import { Layout, Row, Col, Typography, Menu } from "antd";

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
        <Title level={3} style={{ margin: 0 }}>
          PATHWISE
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
            color: "#0F2442",
          }}
        >
          <Menu.Item
            key="home"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            Industry Tracks
          </Menu.Item>
          <Menu.Item
            key="results"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            Results
          </Menu.Item>
          <Menu.Item
            key="mentors"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            Mentors
          </Menu.Item>
          <Menu.Item
            key="about"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            About Us
          </Menu.Item>
          <Menu.Item
            key="reference"
            style={{ borderBottom: "none", marginRight: "20px" }}
          >
            Reference
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </Header>
);

export default HeaderComponent;
