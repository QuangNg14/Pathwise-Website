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

  // Company logos data
  const companyLogos = [
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390598/logos/gaaublizbntaf7iwvzeq.png", // NVIDIA
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/lqooroxhqklyaorccaou.png", // Meta
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/h5fumaeya8b18unp75dw.png", // Microsoft
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/kjm9iesykorj7fvltdlo.png", // Deutsche Bank
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734390599/logos/txryimdx1cx2axuhooeo.png", // EY
    "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734879271/logos/jbo4ogccxxe7jkzofqfb.png", // BCG
  ];

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
            animateCount(setResearchLabCount, 12);
          } else if (entry.target === dellInternshipRef.current) {
            animateCount(setDellInternshipCount, 58);
          } else if (entry.target === dowJonesInternshipRef.current) {
            animateCount(setDowJonesInternshipCount, 5);
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
      {/* Header Section with Title and Description Side by Side */}
      <div className="header-section">
        <div className="title-container">
          <Text className="main-title">Land Your Dream Offers</Text>
        </div>
        <div className="description-container">
          <Text className="description">
            In the first year of launching the 2024 program, we helped{" "}
            <span className="primary-color">32 mentees</span> secure multiple{" "}
            <span className="primary-color">interviews and job offers</span>{" "}
            from major companies in the U.S. like Meta, Microsoft, Google,
            Palantir, Bank of America, Amazon, Morgan Stanley, and HubSpot. Our
            mentors have experience in various fields such as{" "}
            <span className="primary-color">
              Software, Data, Finance, and Consulting
            </span>
          </Text>
        </div>
      </div>

      {/* Company Logos Carousel */}
      <div className="dream-job-logos-section">
        <div className="dream-job-logos-carousel">
          {/* First set of logos */}
          {companyLogos.map((logo, index) => (
            <img
              key={`first-${index}`}
              src={logo}
              alt={`Company ${index + 1}`}
              className="dream-job-company-logo"
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {companyLogos.map((logo, index) => (
            <img
              key={`second-${index}`}
              src={logo}
              alt={`Company ${index + 1}`}
              className="dream-job-company-logo"
            />
          ))}
        </div>
      </div>

      <div className="small-container">
        <Row gutter={[16, 16]} className="statistics">
          <Col xs={24} sm={8} md={8} className="stat-item" ref={researchLabRef}>
            <Text className="stat-number">{researchLabCount}</Text>
            <Text className="stat-description">
              offers in research labs and data programs
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
            <Text className="stat-description">
              internship offers in the U.S.
            </Text>
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
              new grad offers in the U.S.
            </Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandYourDreamJob;
