import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Typography } from "antd";
import "./LandYourDreamJob.css";

const { Text } = Typography;

const LandYourDreamJob = () => {
  const [researchLabCount, setResearchLabCount] = useState(0);
  const [dellInternshipCount, setDellInternshipCount] = useState(0);
  const [dowJonesInternshipCount, setDowJonesInternshipCount] = useState(0);

  const researchLabRef = useRef(null);
  const dellInternshipRef = useRef(null);
  const dowJonesInternshipRef = useRef(null);

  useEffect(() => {
    const duration = 2000;
    const increment = 50;

    const animateCount = (setCount, end) => {
      let start = 0;
      const step = end / (duration / increment);
      const counter = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.ceil(start));
        }
      }, increment);
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === researchLabRef.current) {
            animateCount(setResearchLabCount, 10);
          } else if (entry.target === dellInternshipRef.current) {
            animateCount(setDellInternshipCount, 18);
          } else if (entry.target === dowJonesInternshipRef.current) {
            animateCount(setDowJonesInternshipCount, 12);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    if (researchLabRef.current) observer.observe(researchLabRef.current);
    if (dellInternshipRef.current) observer.observe(dellInternshipRef.current);
    if (dowJonesInternshipRef.current)
      observer.observe(dowJonesInternshipRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <Text className="main-title">Land Your Dream Offers</Text>
      <div className="small-container">
        <Text className="description">
          Chúng mình đã giúp <span className="primary-color">30+ Mentees</span>{" "}
          đạt được nhiều{" "}
          <span className="primary-color">interviews và job offer</span> từ các
          công ty lớn ở Mỹ như Meta, Microsoft, Palantir, Bank of America, Dell,
          DoorDash, Stripe, Amazon, Morgan Stanley, TikTok và ở Việt Nam như
          Viettel, Momo, FPT, Rockship.{" "}
        </Text>
        <Text className="description">
          Các mentors có kinh nghiệm ở nhiều lĩnh vực như{" "}
          <span className="primary-color">
            Software, Data, Finance, Consulting
          </span>
        </Text>
        <Row gutter={[16, 16]} className="statistics">
          <Col xs={24} sm={8} md={8} className="stat-item" ref={researchLabRef}>
            <Text className="stat-number">{researchLabCount}</Text>
            <Text className="stat-description">
              offers ở research lab và các data programs
            </Text>
          </Col>
          <Col
            xs={24}
            sm={8}
            md={8}
            className="stat-item"
            ref={dellInternshipRef}
          >
            <Text className="stat-number">{dellInternshipCount}</Text>
            <Text className="stat-description">offers internship ở Mỹ</Text>
          </Col>
          <Col
            xs={24}
            sm={8}
            md={8}
            className="stat-item"
            ref={dowJonesInternshipRef}
          >
            <Text className="stat-number">{dowJonesInternshipCount}</Text>
            <Text className="stat-description">
              offers internship ở Việt Nam
            </Text>
          </Col>
        </Row>
      </div>
      <div className="image-container">
        <img
          src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/ngysjf1bxfyygeary83o.png"
          alt="Dream Job Image"
          className="large-image"
        />
      </div>
    </div>
  );
};

export default LandYourDreamJob;
