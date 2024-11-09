import React from "react";
import { Card, Typography, Carousel } from "antd";
import "./MenteeShowcase.css";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Meta } = Card;

const mentors = [
  // {
  //   name: "Hoàng Quỳnh Hương",
  //   image:
  //     "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730615998/wzq64kqpmmkkdsypdf1f.jpg",
  //   university: "New York University",
  //   offers: "Meta, Paypal",
  // },
  {
    name: "Nguyễn Thu Huệ",
    university: "DePauw University",
    offers: "Bank of America - Software Engineer Intern",
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/mzb59fgv7xsx2kvnkpyp.jpg", // Placeholder avatar image
  },
  {
    name: "Gia Hy",
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730616070/bh5pqnyayotoxprcoafs.jpg",
    university: "University of South Florida",
    offers: "Meta, Microsoft",
  },
  {
    name: "Trương Khánh Hưng",
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730773203/jafp7uywccmrdsibqcus.jpg",
    university: "University of South Florida",
    offers: "Morgan Stanley",
  },
  {
    name: "Bảo Nhi",
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/sqsmkahbvmgdqb1wlhrh.jpg",
    university: "Drexel University",
    offers: "Amazon",
  },
];

const MenteeShowcase = () => {
  const router = useRouter();
  return (
    <div className="mentor-showcase-container">
      <Title
        level={2}
        className="section-title"
        style={{
          fontWeight: 700,
          fontSize: 40,
          lineHeight: "65.35px",
          textAlign: "center",
          color: "white",
        }}
      >
        Học Viên Tiêu Biểu Của Pathwise
      </Title>
      <Text className="sub-title">Ngành Software Engineer và Data</Text>

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
            <Card hoverable className="mentor-card">
              <div className="mentor-image-container">
                <img
                  alt={mentor.name}
                  src={mentor.image}
                  className="mentor-image"
                />
              </div>
              <Meta
                title={mentor.name}
                description={mentor.university}
                className="mentor-meta"
              />
              <Text className="mentor-company">Offers at {mentor.offers}</Text>
            </Card>
          </div>
        ))}
      </Carousel>

      <div className="call-to-action">
        <button
          className="custom-button"
          onClick={() => router.push("/results")}
        >
          Tìm Hiểu Thêm
        </button>
      </div>
    </div>
  );
};

export default MenteeShowcase;
