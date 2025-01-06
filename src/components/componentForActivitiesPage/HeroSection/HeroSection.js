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
            Introduction to the Pathwise Mentorship Program
          </Title>
          <Text className="hero-description">
            Pathwise is a peer-to-peer mentorship program for university
            students seeking job opportunities in the USA. The program offers 12
            weeks of guidance with essential, focused, and personalized
            knowledge and information. It currently supports students applying
            to industries such as Software, Data, and Finance.
          </Text>
          <br />
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
