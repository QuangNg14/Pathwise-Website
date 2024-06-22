import React from 'react';
import { Row, Col, Typography } from 'antd';
import './footer.css';  // Import the custom CSS file

const { Title, Link } = Typography;

const Footer = () => {
  return (
    <div className="footer">
      <Row justify="space-between">
        <Col xs={24} sm={12} md={6} lg={4}>
          <div className="logo">
            <img src='https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/448339236_7674454286001750_2418702662290656371_n.png?stp=dst-png_s2048x2048&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ccpAd25ATlAQ7kNvgExtBJU&_nc_ht=scontent-lga3-1.xx&oh=03_Q7cD1QHT6qSQVI0QGnwgO5sGibCBnIu9WocBw8Q8Mi0VM5dXIg&oe=669D91A8'/>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title level={4}>Information</Title>
          <Link href="#" className="footer-link">Outcomes Report</Link>
          <Link href="#" className="footer-link">Application Process</Link>
          <Link href="#" className="footer-link">Fellow Stories</Link>
          <Link href="#" className="footer-link">Our Mentors</Link>
          <Link href="#" className="footer-link">FAQ</Link>
        </Col>
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title level={4}>Company</Title>
          <Link href="#" className="footer-link">About us</Link>
          <Link href="#" className="footer-link">Manifesto</Link>
          <Link href="#" className="footer-link">Contact us</Link>
        </Col>
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title level={4}>Resource</Title>
          <Link href="#" className="footer-link">Blog</Link>
          <Link href="#" className="footer-link">Events</Link>
          <Link href="#" className="footer-link">Privacy Policy</Link>
          <Link href="#" className="footer-link">Terms of Use</Link>
        </Col>
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title level={4}>Industry Tracks</Title>
          <Link href="#" className="footer-link">Software Engineering</Link>
          <Link href="#" className="footer-link">Consulting</Link>
          <Link href="#" className="footer-link">Investment Banking</Link>
          <Link href="#" className="footer-link">Data</Link>
          <Link href="#" className="footer-link">Marketing</Link>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
