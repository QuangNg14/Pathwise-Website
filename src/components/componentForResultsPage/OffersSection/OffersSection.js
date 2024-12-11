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
      "HubSpot - Software Engineer Intern",
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
    name: "Mentee",
    school: "University of Washington",
    year: "Junior",
    major: "Computer Science",
    offers: ["Meta - Software Engineer Intern"],
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // Placeholder avatar image
  },
  {
    name: "Đặng Thanh Vân",
    school: "Vanderbilt University",
    year: "Sophomore",
    major: "Computer Science",
    offers: ["Google STEP - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733952244/oueigloxkovcns1mhnpd.jpg", // Placeholder avatar image
  },
  {
    name: "Cao Phương An",
    school: "Texas Christian University",
    year: "Sophomore",
    major: "Data Science",
    offers: ["Alcon - Data Science Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1732175391/shehrfpv16a1wqairtrs.jpg", // Placeholder avatar image
  },
  {
    name: "Minh Thiều",
    school: "University of South Florida",
    year: "Junior",
    major: "Statistics",
    offers: [
      "Ebay - Data Science Intern",
      "Microsoft - Financial Analyst Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1732175391/ce0qiw285pc5uf7igsbu.jpg", // Placeholder avatar image
  },
  {
    name: "Trương Khánh Hưng",
    school: "University of South Florida",
    year: "Junior",
    major: "Computer Science",
    offers: [
      "Adobe - Software Engineer Intern",
      "Morgan Stanley - Software Engineer Intern",
      "Meta - Production Engineer Intern",
    ],
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
    name: "Hiệp Nguyễn",
    school: "Villanova University",
    year: "Sophomore",
    major: "Computer Science",
    offers: ["Dell - Data Science Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733611066/kcjglzb0hqksfrnkm7u2.jpg", // Placeholder avatar image
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
    name: "Lê Hoàng Minh",
    school: "University of California, Berkeley",
    year: "Master",
    major: "Statistics",
    offers: [
      "Bill.com - Machine Learning Engineer Intern",
      "Autodesk - Data Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733882589/x9rziqrmc1jfpy7e6umh.jpg", // Placeholder avatar image
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
    name: "Mentee",
    school: "Soka Univeristy",
    year: "Sophomore",
    major: "Computer Science",
    offers: ["HubSpot - Software Engineer Intern"],
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // Placeholder avatar image
  },
  {
    name: "Minh Đỗ",
    school: "DePauw University",
    year: "Senior",
    major: "Actuarial Science, Computer Science",
    offers: [
      "UnitedHealth Group - Actuarial Analyst Intern",
      "Kuvare Holdings - Actuarial Analyst Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1732175391/rqnz7pcokxynvmcmzkq1.jpg", // Placeholder avatar image
  },
];

const newGradOffersData = [
  {
    name: "Thịnh Nguyễn",
    school: "University of Massachusetts Amherst",
    year: "Senior",
    major: "Computer Science",
    offers: [
      "Affirm - Software Engineer",
      "Juniper Networks - Software Engineer",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733611066/dqqyfsubaiwxmnfdchvy.jpg", // Placeholder avatar image
  },
  {
    name: "Linda Nguyễn",
    school: "University of South Florida",
    year: "Senior",
    major: "Computer Science",
    offers: ["Microsoft - Software Engineer"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733618484/adkwacjsdezx0zy5ksmq.jpg", // Placeholder avatar image
  },
  {
    name: "Nguyên Trần",
    school: "Columbia University",
    year: "Senior",
    major: "Computer Science",
    offers: ["Morgan Stanley - Software Engineer"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733021477/ngjmq0jn6clk5j8ivhtp.jpg", // Placeholder avatar image
  },
  {
    name: "Xuân Thu",
    school: "Reed College",
    year: "Senior",
    major: "Computer Science",
    offers: ["Morgan Stanley - Investment Analyst Parametric"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733021478/qe4e5kiasugryll3inue.jpg", // Placeholder avatar image
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
      <Title level={2} className="section-title">
        New Grad Offers 2025
      </Title>
      <Row gutter={[24, 24]}>
        {newGradOffersData.map((mentee, index) => (
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
