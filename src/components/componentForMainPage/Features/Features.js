import React from "react";
import { Typography, Card } from "antd";
import "./Features.css";

const { Title, Text } = Typography;

const Features = () => {
  const featuresData = [
    {
      title: "12 Weeks of Guidance",
      content: "Covering the entire internship application process, from resume and personal projects to behavioral and technical interviews. Weekly 1-on-1 advisory meetings to address any questions, with unlimited interview support."
    },
    {
      title: "Direct Guidance", 
      content: "Work on 100% full-stack personal projects with other mentees and effectively participate in job conferences."
    },
    {
      title: "Mock interviews",
      content: "Tailored for each research lab and company. Receive the latest updates on the job market and gain a clear understanding of each company unique characteristics."
    },
    {
      title: "Networking Support",
      content: "Assistance with securing referrals, applying to companies, and advancing your career."
    }
  ];

  return (
    <section className="features-container">
      <div className="features-content">
        {/* Left side - Title */}
        <div className="features-title-section">
          <Title level={1} className="features-title">
            What we do
          </Title>
        </div>

        {/* Right side - Features Grid */}
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <Card key={index} className="feature-item" bordered={false}>
              <Title level={3} className="feature-heading">
                {feature.title}
              </Title>
              <Text className="feature-content">
                {feature.content}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
