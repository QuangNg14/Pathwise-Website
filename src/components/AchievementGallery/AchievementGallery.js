import React from "react";
import { Typography, Carousel } from "antd";
import "./AchievementGallery.css";

const { Title, Text } = Typography;

const AchievementGallery = () => {
  const images = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];

  return (
    <div className="trusted-by-container">
      <Text
        style={{
          display: "block",
          fontWeight: 400,
          fontSize: 54,
          lineHeight: "65.35px",
          marginBottom: 40,
        }}
        level={2}
      >
        Chia sẻ của các Mentees
      </Text>
      <Carousel
        dots={{ className: "carousel-dots" }}
        arrows={true}
        slidesToShow={3}
        slidesToScroll={1}
        infinite={true}
        centerMode={true}
        centerPadding="15px"
        autoplay
      >
        {images.map((imgSrc, index) => (
          <div key={index} className="carousel-item">
            <img src={imgSrc} alt={`Trusted ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AchievementGallery;
