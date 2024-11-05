import React from "react";
import { Row, Col, Typography, Button } from "antd";
import "./PeerToPeerMentoring.css";

const { Title, Text } = Typography;

const PeerToPeerMentoring = () => {
  return (
    <div className="peer-mentoring-container">
      <Row className="peer-mentoring-row" align="middle">
        <Col xs={24} md={14} className="text-column">
          <Title
            level={1}
            className="peer-mentoring-title"
            style={{
              fontWeight: 700,
              fontSize: 40,
              lineHeight: "65.35px",
              color: "#0F2442",
            }}
          >
            Peer-to-peer mentoring
          </Title>
          <Text className="peer-mentoring-text">
            Our mentors from Big Tech and major financial firms help you secure
            your next internships/jobs.
          </Text>
          <div className="buttons-container">
            <Button className="custom-button">Career Advice &rarr;</Button>
            <Button className="custom-button">Resume Review &rarr;</Button>
            <Button className="custom-button">Mock Interviews &rarr;</Button>
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
