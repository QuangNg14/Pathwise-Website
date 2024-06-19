import React from "react";
import { Carousel, Card } from "antd";
import "./MentorCarousel.css";
import "antd/dist/reset.css";

const { Meta } = Card;

const MentorCarousel = ({ mentors }) => {
  return (
    <div className="mentor-carousel-container">
      <Carousel
        dots={{ className: "carousel-dots" }}
        arrows={true}
        slidesToShow={3}
        slidesToScroll={1}
        infinite={true}
        centerMode={true}
        centerPadding="15px"
      >
        {mentors.map((mentor, index) => (
          <div key={index} className="carousel-slide">
            <Card
              hoverable
              className="mentor-card"
              cover={
                <img
                  alt={mentor.name}
                  src={mentor.image}
                  className="mentor-image"
                />
              }
            >
              <Meta title={mentor.name} description={mentor.title} />
              <p className="mentor-company">{mentor.company}</p>
              <div className="company-logos">
                {mentor.companyLogos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`${mentor.company}-${idx}`}
                    className="logo-avatar"
                  />
                ))}
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MentorCarousel;
