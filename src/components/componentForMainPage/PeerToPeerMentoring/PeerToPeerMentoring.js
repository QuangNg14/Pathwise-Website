import React from "react";
import Image from "next/image";
import { Typography, Button } from "antd";
import { useRouter } from "next/navigation";
import "./PeerToPeerMentoring.css";

const { Title, Text } = Typography;

const PeerToPeerMentoring = () => {
  const router = useRouter();

  return (
    <section className="peer-to-peer-container">
      <div className="peer-to-peer-content">
        {/* Row 1 - Title */}
        <div className="peer-to-peer-title-row">
          <Title level={1} className="peer-to-peer-title">
            Mentoring with Proven Result
          </Title>
        </div>

        {/* Row 2 - Description and Buttons (2 columns) */}
        <div className="peer-to-peer-content-row">
          <div className="peer-to-peer-description-column">
            <Text className="peer-to-peer-description">
              Get targeted, affordable, and personalized 1-on-1 guidance optimized
              for students applying to jobs at top companies!
            </Text>
          </div>
          
          <div className="peer-to-peer-buttons-column">
            <Button
              type="primary"
              className="peer-to-peer-primary-btn"
              onClick={() => router.push("/results")}
            >
              View result
            </Button>
            <Button
              type="text"
              className="peer-to-peer-secondary-btn"
              onClick={() => router.push("/program")}
            >
              Mentorship program
            </Button>
          </div>
        </div>

        {/* Row 3 - Full width image */}
        <div className="peer-to-peer-image-row">
          <div className="peer-to-peer-image-wrapper">
            <div className="peer-to-peer-image-card">
              <img
                src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730332025/lwvuognn4fmmqwnrpmdi.jpg"
                alt="Students collaborating and receiving mentorship guidance"
                className="peer-to-peer-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider - only visible on mobile */}
      <hr className="peer-to-peer-divider" />
    </section>
  );
};

export default PeerToPeerMentoring;
