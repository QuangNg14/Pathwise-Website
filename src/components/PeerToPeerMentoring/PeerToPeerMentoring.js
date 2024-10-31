import React from "react";
import { Row, Col, Typography, Button } from "antd";
import "./PeerToPeerMentoring.css";

const { Title, Text } = Typography;

const PeerToPeerMentoring = () => {
  return (
    <div className="peer-mentoring-container">
      <Row className="peer-mentoring-row" align="middle">
        <Col xs={24} md={14} className="text-column">
          <Title level={1} className="peer-mentoring-title">
            Peer-to-peer mentoring
          </Title>
          <Text className="peer-mentoring-text">
            Các mentors có kinh nghiệm làm việc ở các công ty Big Tech và ngân
            hàng lớn giúp bạn land được internships/jobs tiếp theo
          </Text>
          <div className="buttons-container">
            {/* <Button className="custom-button">Tư vấn du học &rarr;</Button> */}
            <Button className="custom-button">Tư vấn tìm việc &rarr;</Button>
            <Button className="custom-button">Sửa CV &rarr;</Button>
            <Button className="custom-button">Phỏng vấn thử &rarr;</Button>
          </div>
        </Col>
        <Col xs={24} md={10} className="image-column">
          <div className="images-stack">
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730332025/lwvuognn4fmmqwnrpmdi.jpg"
              alt="Mentor 1"
              className="image image-top"
            />
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730176142/sr5gza9fnfa6buyxzhh7.png"
              alt="Mentor 2"
              className="image image-middle"
            />
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730332894/llghoovz9ual5e55c105.jpg"
              alt="Mentor 3"
              className="image image-bottom"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PeerToPeerMentoring;
