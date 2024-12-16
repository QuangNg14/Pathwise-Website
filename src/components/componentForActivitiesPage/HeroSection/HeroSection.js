import React from "react";
import { Typography, Button } from "antd";
import "./HeroSection.css";

const { Title, Text } = Typography;

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="overlay">
        <div className="content">
          <Title className="hero-title" style={{ color: "var(--text-color)" }}>
            Giới thiệu về Program Pathwise Mentorship
          </Title>
          <Text className="hero-description">
            Pathwise là một program mentorship peer-to-peer cho sinh viên đại
            học đang muốn tìm kiếm việc làm tại Mỹ. Chương trình sẽ cung cấp 12
            tuần hướng dẫn với hàm lượng kiến thức và thông tin được tổng hợp
            cần thiết, đúng trọng tâm và cá nhân hóa. Chương trình hiện đang
            giúp các bạn muốn apply vào các ngành Software, Data và Finance.
          </Text>
          <a
            href="https://www.facebook.com/pathwise.techmentorship"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
