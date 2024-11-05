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
        centerMode={false} // Disable center mode to ensure full-width display
        centerPadding="0" // Remove any padding around the carousel items
        autoplay={true}
        autoplaySpeed={5000}
        pauseOnHover={true}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {mentors.map((mentor, index) => (
          <div key={index} className="carousel-slide">
            <Card hoverable className="mentor-card">
              <div className="mentor-card-content">
                <img
                  alt={mentor.name}
                  src={mentor.image}
                  className="mentor-image"
                />
                <Meta
                  title={<span className="mentor-name">{mentor.name}</span>}
                  description={
                    <span className="mentor-title">{mentor.title}</span>
                  }
                />
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
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MentorCarousel;
