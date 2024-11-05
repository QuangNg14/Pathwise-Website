import React from "react";
import { Layout, Row, Col, Typography, Carousel, Card } from "antd";
import "antd/dist/reset.css";
import "./MentorCarousel.css";

const { Title } = Typography;
const { Meta } = Card;

const MentorCarousel = ({ mentors }) => {
  return (
    <Layout
      style={{
        padding: "64px 20px", // Adjust padding for responsiveness
        backgroundColor: "var(--mentor-color)",
        width: "100%",
      }}
    >
      <Row justify="center">
        <Col span={24}>
          <Title
            level={2}
            style={{
              fontWeight: 700,
              textAlign: "center",
              color: "#0F2442",
              fontSize: "clamp(24px, 5vw, 40px)", // Responsive font size
            }}
          >
            Meet your mentor
          </Title>
        </Col>
      </Row>
      <div className="mentor-carousel-container">
        <Carousel
          dots={{ className: "carousel-dots" }}
          arrows={true}
          slidesToShow={3}
          slidesToScroll={1}
          infinite={true}
          centerMode={false}
          centerPadding="0"
          autoplay={true}
          autoplaySpeed={5000}
          pauseOnHover={true}
          responsive={[
            {
              breakpoint: 1200,
              settings: { slidesToShow: 3 },
            },
            {
              breakpoint: 992,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1 },
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
                      <>
                        <span className="mentor-title">{mentor.title}</span>
                        <p className="mentor-company">{mentor.company}</p>
                      </>
                    }
                  />
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
    </Layout>
  );
};

export default MentorCarousel;
