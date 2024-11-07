import React from "react";
import { Row, Col, Card, Typography } from "antd";
import "./OffersSection.css";

const { Title, Text } = Typography;

const offersData = [
  {
    name: "Hoàng Quỳnh Hương",
    school: "New York University",
    year: "Junior",
    major: "Computer Science",
    offers: [
      "Meta - Software Engineer Intern",
      "Paypal - Software Engineer Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730615998/wzq64kqpmmkkdsypdf1f.jpg", // Placeholder avatar image
  },
  {
    name: "Gia Hy",
    school: "University of South Florida",
    year: "Sophomore",
    major: "Computer Science",
    offers: [
      "Meta - Software Engineer Intern",
      "Microsoft - Software Engineer Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730616070/bh5pqnyayotoxprcoafs.jpg", // Placeholder avatar image
  },
  {
    name: "Trương Khánh Hưng",
    school: "University of South Florida",
    year: "Sophomore",
    major: "Computer Science",
    offers: ["Morgan Stanley - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730773203/jafp7uywccmrdsibqcus.jpg", // Placeholder avatar image
  },
  {
    name: "Bảo Nhi",
    school: "Drexel University",
    year: "Senior",
    major: "Computer Science",
    offers: ["Amazon - Business Intelligence Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/sqsmkahbvmgdqb1wlhrh.jpg", // Placeholder avatar image
  },
  {
    name: "Phạm Thục Quyên",
    school: "Washington and Lee University",
    year: "Junior",
    major: "Computer Science",
    offers: ["Bank of America - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/aj9loljr04mndd17yxxr.jpg", // Placeholder avatar image
  },
  {
    name: "Nguyễn Thu Huệ",
    school: "DePauw University",
    year: "Junior",
    major: "Computer Science",
    offers: ["Bank of America - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/mzb59fgv7xsx2kvnkpyp.jpg", // Placeholder avatar image
  },
  {
    name: "Hà Duy Linh",
    school: "University of South Florida",
    year: "Sophomore",
    major: "Computer Science",
    offers: ["Actualization AI - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/dqo5ywsyrbu5xithxktk.jpg", // Placeholder avatar image
  },
  {
    name: "Nguyệt Hà",
    school: "Soka University of America",
    year: "Junior",
    major: "Computer Science",
    offers: [
      "HubSpot - Software Engineer Intern",
      "Lilly - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660432/nmvxrcs0pmcswsjwpkcl.jpg", // Placeholder avatar image
  },
];

const OffersSection = () => {
  return (
    <div className="offers-section">
      <Title level={2} className="section-title">
        Internship Offers Summer 2025
      </Title>
      <Row gutter={[24, 24]}>
        {offersData.map((mentee, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="offer-card" hoverable>
              <div className="mentee-avatar-container">
                <img
                  src={mentee.avatar}
                  alt={mentee.name}
                  className="mentee-avatar"
                />
              </div>
              <div className="mentee-details">
                <Text className="mentee-name">{mentee.name}</Text>
                <Text className="mentee-info">{`${mentee.school} - ${mentee.year}`}</Text>
                <Text className="mentee-info">{mentee.major}</Text>
                <div className="mentee-offers">
                  <Text className="offers-title">Offers:</Text>
                  <ul className="offers-list">
                    {mentee.offers.map((offer, idx) => (
                      <li key={idx} className="offer-text">
                        {offer}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OffersSection;
