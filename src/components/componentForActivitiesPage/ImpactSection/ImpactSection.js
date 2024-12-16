import React from "react";
import { Row, Col, Typography } from "antd";
import "./ImpactSection.css";

const { Title, Text } = Typography;

const ImpactSection = () => {
  return (
    <div className="impact-section">
      {/* First Layout */}
      <div className="impact-item">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Title level={2} className="impact-title">
              Improve Profile
            </Title>
            <Text className="impact-subtitle">Resume + LinkedIn</Text>
            <Text className="impact-description">
              Hướng dẫn cách xây dựng một resume chuyên nghiệp và giới thiệu các
              công cụ hỗ trợ xây dựng hồ sơ. Review resume của từng người và có
              những feedback cụ thể. Hỗ trợ xây dựng một LinkedIn profile chuyên
              nghiệp. Cách để upload projects và sử dụng hiệu quả Github
            </Text>
          </Col>
          <Col xs={24} md={12} className="image-column">
            <img
              src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/pngoim1ab9al3dce0niv.jpg"
              alt="Profile Improvement"
              className="single-image"
            />
          </Col>
        </Row>
      </div>

      {/* Second Layout */}
      <div className="impact-item">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12} className="image-column">
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/zl6k4t8jklgzvuppqs97.jpg"
              alt="Project Building"
              className="single-image"
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2} className="impact-title">
              Build Technical Projects
            </Title>
            <Text className="impact-subtitle">Full-stack + Cloud + AI</Text>
            <Text className="impact-description">
              Review những ngôn ngữ phổ biến cho các internship jobs hiện nay và
              các tech-stack thịnh hành HTML/CSS/JavaScript, MERN stack, NET
              stack + Azure, Python Flask + AWS, Expo React Native. Hướng dẫn
              xây dựng một personal project from scratch. Hướng dẫn các cách
              hiệu quả để xây dựng portfolio có các projects.
            </Text>
          </Col>
        </Row>
      </div>

      {/* Third Layout */}
      <div className="impact-item">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Title level={2} className="impact-title">
              Mock Interviews
            </Title>
            <Text className="impact-subtitle">Behavioral + Technical</Text>
            <Text className="impact-description">
              Cách hiệu quả để luyện tập chuẩn bị cho 1 behavioral interview.
              nghiên cứu đặc điểm của từng công ty và tailor câu trả lời. Hướng
              dẫn cách để chuẩn bị technical interview qua luyện các bài
              Leetcode, Object-oriented programming và System Design
            </Text>
          </Col>
          <Col xs={24} md={12} className="image-column">
            <img
              src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/fsty7qqzsj6ecnb5dpkt.png"
              alt="Mock Interview"
              className="single-image"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ImpactSection;
