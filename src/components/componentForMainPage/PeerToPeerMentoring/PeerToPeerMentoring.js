import React from "react";
import { Row, Col, Typography, Button } from "antd";
import "./PeerToPeerMentoring.css";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const PeerToPeerMentoring = () => {
  const router = useRouter();
  return (
    <div className="peer-mentoring-container">
      <Row className="peer-mentoring-row" align="middle">
        <Col xs={24} md={12} lg={10} className="text-column">
          <Title level={1} className="peer-mentoring-title">
            Mentoring with Proven{" "}
            <span className="highlighted-outcomes">Results</span>
          </Title>
          <Text className="peer-mentoring-text">
            Get targeted, affordable, and personalized 1-on-1 guidance optimized
            for students applying to jobs at top companies!
          </Text>
          <div className="buttons-container">
            <Button
              className="custom-button register-button"
              href="https://docs.google.com/forms/d/e/1FAIpQLSf44FrJ2powtp9MMvGfHcz8F7irZLyfjxaCkIpr-HAr0Fl4oQ/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </Button>
            <Button
              className="custom-button mentorship-button"
              onClick={() => router.push("/activities")}
            >
              Mentorship Program
            </Button>
          </div>
        </Col>
        <Col xs={24} md={12} lg={14} className="image-column">
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
