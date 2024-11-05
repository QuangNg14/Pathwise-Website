import React from "react";
import { Typography, Carousel } from "antd";
import "./AchievementGallery.css";

const { Title } = Typography;

const AchievementGallery = () => {
  const images = [
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770552/ohi0cor5p9m9yjisxnwv.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770552/i4kam25o6e3erjelyjsn.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770552/lcz6flsmhtvrvf7mpuhp.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770552/eeqe6vujqbcn5wjiyvkj.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770551/e31qru7vssaxleldjc0w.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770551/ootijxr52oanrnyy2wkz.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770551/g3gwfrzrlqof6xucus6y.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770551/s2bnotjycfbrn3fwjmgh.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770551/e4g4zvyqozlteei9hhwz.png",
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730770551/uz887niohjebt8z4zum7.png",
  ];

  return (
    <div className="trusted-by-container">
      <div className="title-container">
        <Title
          level={2}
          className="title-text"
          style={{
            fontWeight: 700,
            fontSize: 40,
            lineHeight: "65.35px",
            textAlign: "center",
            color: "white",
          }}
        >
          Chia sẻ của các Mentees
        </Title>
      </div>
      <Carousel
        dots={{ className: "carousel-dots" }}
        arrows={true}
        slidesToShow={5}
        slidesToScroll={1}
        infinite={true}
        centerMode={true}
        centerPadding="15px"
        autoplay
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
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
