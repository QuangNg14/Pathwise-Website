import React from "react";
import { Row, Col, Typography } from "antd";
import Link from "next/link";
import {
  FacebookOutlined,
  MailOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./footer.css";

const { Title } = Typography;

const FooterComponent = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <Row gutter={[16, 16]}>
          {/* Logo Section */}
          <Col xs={24} sm={12} md={6} lg={6} className="footer-logo-col">
            <div className="footer-logo">
              <img
                src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730672180/xywohx68q89slpnh7kho.png"
                alt="Logo"
              />
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/pathwise.techmentorship"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined className="social-icon" />
                </a>
                <a
                  href="mailto:techprep.mentor@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlined className="social-icon" />
                </a>
                <a
                  href="https://www.instagram.com/quang.nguyen.nh/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramOutlined className="social-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/quang1401/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinOutlined className="social-icon" />
                </a>
              </div>
            </div>
          </Col>

          {/* Information Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Title level={4} className="footer-title">
              Information
            </Title>
            <Link href="#" className="footer-link">
              Outcomes Report
            </Link>
            <Link href="#" className="footer-link">
              Application Process
            </Link>
            <Link href="#" className="footer-link">
              Fellow Stories
            </Link>
            <Link href="#" className="footer-link">
              Our Mentors
            </Link>
            <Link href="#" className="footer-link">
              FAQ
            </Link>
          </Col>

          {/* Company Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Title level={4} className="footer-title">
              Company
            </Title>
            <Link href="#" className="footer-link">
              About Us
            </Link>
            <Link href="#" className="footer-link">
              Manifesto
            </Link>
            <Link href="#" className="footer-link">
              Contact Us
            </Link>
          </Col>

          {/* Resource Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Title level={4} className="footer-title">
              Resource
            </Title>
            <Link href="#" className="footer-link">
              Blog
            </Link>
            <Link href="#" className="footer-link">
              Events
            </Link>
            <Link href="#" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="#" className="footer-link">
              Terms of Use
            </Link>
          </Col>

          {/* Industry Tracks Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Title level={4} className="footer-title">
              Industry Tracks
            </Title>
            <Link href="#" className="footer-link">
              Software Engineering
            </Link>
            <Link href="#" className="footer-link">
              Consulting
            </Link>
            <Link href="#" className="footer-link">
              Investment Banking
            </Link>
            <Link href="#" className="footer-link">
              Data
            </Link>
            <Link href="#" className="footer-link">
              Marketing
            </Link>
          </Col>
        </Row>

        {/* Contact Email */}
        <div className="contact-email">
          <span>Contact: </span>
          <a href="mailto:techprep.mentor@gmail.com">
            techprep.mentor@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
