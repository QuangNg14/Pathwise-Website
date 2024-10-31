import React from "react";
import { Card, Typography, Carousel } from "antd";
import "./MenteeShowcase.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const mentors = [
  {
    name: "Nhật Nam",
    image: "/images/mentor1.jpg",
    university: "Đại học South Florida",
    company: "AMAZON",
  },
  {
    name: "Lân Nguyễn",
    image: "/images/mentor2.jpg",
    university: "Đại học Ohio Wesleyan",
    company: "FACEBOOK",
  },
  {
    name: "Emi Trần",
    image: "/images/mentor3.jpg",
    university: "UC Berkeley",
    company: "NVIDIA",
  },
  {
    name: "Nhật Nguyễn",
    image: "/images/mentor4.jpg",
    university: "Đại học Cornell",
    company: "ETSY",
  },
];

const MenteeShowcase = () => {
  return (
    <div className="mentor-showcase-container">
      <Title level={2} className="section-title">
        Học Viên Tiêu Biểu Của Pathwise
      </Title>
      <Text className="sub-title">Khối ngành Software Engineer và Data</Text>

      <Carousel
        arrows
        dots={false}
        infinite
        slidesToShow={4}
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ]}
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
              <Meta title={mentor.name} description={mentor.university} />
              <Text className="mentor-company">{mentor.company}</Text>
            </Card>
          </div>
        ))}
      </Carousel>

      <div className="call-to-action">
        <button className="custom-button">Tìm Hiểu Thêm</button>
      </div>
    </div>
  );
};

export default MenteeShowcase;
