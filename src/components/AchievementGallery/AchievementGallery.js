import React from "react";
import { Typography, Carousel } from "antd";
import "./AchievementGallery.css";

const { Title, Text } = Typography;

const AchievementGallery = () => {
  const images = [
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/448355128_3412068069092826_8492927635565985888_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=19Bcf7eaI_YQ7kNvgGIP5uT&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGCgmWklVYemhGp64xGPa1BNuGNlRriKBhHwgcsrVFYGw&oe=669A8DC6",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/448401732_441261785352745_8959934623899413687_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4UkKzgTM7AAQ7kNvgE3lJzZ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QG4SZh3G1vwOMmTHeWplezg7t498nw-VJc7six-IigTPQ&oe=669A9D71",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/448751717_833201024858833_5909896787213097863_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=28OqM7T0mygQ7kNvgFoNr0N&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QElD3WUmlBhaW4dhLdSIamn_3FR4H0bcDoLUqBuH1DAoA&oe=669A8104",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/448565791_438577702401224_8406324081580138135_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WpM9TWRn6SYQ7kNvgGANYWU&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGZiLVs_1r6xI87irdamgZ69ud6LwK7ZaKGjj4SOkPedA&oe=669A7CA8",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/448424892_338721249096872_285636931744803739_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=im9wM4O3FWAQ7kNvgGREk2e&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QEV8eFvV9XH4DZqZczcyJkDPiTYkjWdNCFPCD3KyziIrA&oe=669A8FE1",
    "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/427846339_122119924562185556_250120375971696889_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bKLpsn7YxCQQ7kNvgETdjIa&_nc_ht=scontent-lga3-1.xx&oh=00_AYDLh5TJ-7qjkjqMUqj0pLMyk6iTEOXraMNjDjDazQ1CGw&oe=667A7A46",
    "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/425835301_122118124262185556_3277021173303481961_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8UCxOG5J9M0Q7kNvgGzsOaY&_nc_ht=scontent-lga3-1.xx&oh=00_AYDRnpD4C6XU2ihm2PGfj8inCtlEiG63bkOvFtyzlGYwiA&oe=667A7BB1",
    "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/434315449_122133218678185556_5769559954005936623_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RjiYl4rMSLEQ7kNvgHPlxTl&_nc_ht=scontent-lga3-2.xx&oh=00_AYAV_cGAOyLIbyYR7YTIT0x_EAeCj2BuKko2Z3VphOVmkA&oe=667A6736",
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
