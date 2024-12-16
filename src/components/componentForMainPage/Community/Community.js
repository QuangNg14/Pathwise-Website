import React from "react";
import { Row, Col, Typography } from "antd";
import "./Community.css";

const { Text } = Typography;

const Community = () => {
  const handleClick = (url) => {
    window.open(url, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className="community-container">
      <div className="community-title-wrapper">
        <Text className="community-title">Pathwise Community</Text>
      </div>
      <Row gutter={[16, 16]} justify="center" className="community-row">
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div
            className="clickable-image"
            onClick={() =>
              handleClick("https://www.facebook.com/groups/756561709660282")
            }
          >
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730337572/bu5grzsancx9rfbojf5h.png"
              alt="Community 1"
              className="community-image"
            />
            <Text className="image-description">Group TECH</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div
            className="clickable-image"
            onClick={() =>
              handleClick("https://www.facebook.com/pathwise.techmentorship")
            }
          >
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730337570/n1tlibp9mn2jrgfwvezs.png"
              alt="Community 2"
              className="community-image"
            />
            <Text className="image-description">Fanpage TECH</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div
            className="clickable-image"
            onClick={() =>
              handleClick("https://www.instagram.com/pathwise.tech/")
            }
          >
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730337570/v4w7likyg1f9ogheu8rg.png"
              alt="Community 3"
              className="community-image"
            />
            <Text className="image-description">Instagram TECH</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div
            className="clickable-image"
            onClick={() =>
              handleClick("https://www.instagram.com/pathwise.fin/")
            }
          >
            <div className="new-badge">NEW</div>
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730337570/fzn9occzuugqwass2ivg.png"
              alt="Community 4"
              className="community-image"
            />
            <Text className="image-description">Instagram FINANCE</Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Community;
