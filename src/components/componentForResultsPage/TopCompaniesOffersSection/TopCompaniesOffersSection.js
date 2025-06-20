import React from "react";
import { Row, Col, Typography, Card } from "antd";
import "./TopCompaniesOffersSection.css";

const { Title } = Typography;

const topCompaniesData = [
  {
    count: 6,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390598/logos/gaaublizbntaf7iwvzeq.png",
  },
  {
    count: 4,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/lqooroxhqklyaorccaou.png",
  },
  {
    count: 3,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/h5fumaeya8b18unp75dw.png",
  },
  {
    count: 2,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/kjm9iesykorj7fvltdlo.png",
  },
  {
    count: 2,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/txryimdx1cx2axuhooeo.png",
  },
  {
    count: 2,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734879271/logos/jbo4ogccxxe7jkzofqfb.png",
  },
  {
    count: 2,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734391496/logos/tjowhqqxzbccntkixoe5.png",
  },
  {
    count: 1,
    logo: "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734478460/logos/y06wfyp0w99ft8k2fahd.png",
  },
];

const TopCompaniesOffersSection = () => {
  return (
    <div className="top-companies-section">
      <div className="top-companies-content">
        <Title level={2} className="section-title">
          🎉 Top Offers in the US 2025 🎉
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {topCompaniesData.map((company, index) => (
            <Col xs={12} sm={8} md={6} lg={6} xl={4} key={index}>
              <Card hoverable className="company-card">
                <div className="company-content">
                  <span className="offer-count">{company.count} x</span>
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="company-logo"
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TopCompaniesOffersSection;
