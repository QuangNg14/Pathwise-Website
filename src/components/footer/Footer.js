import React from "react";
import { Row, Col, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import "./Footer.css";

const { Text } = Typography;

const FooterComponent = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className="footer">
      <div className="footer-container">
        <Row gutter={[40, 40]} justify="space-between">
          {/* Logo Section */}
          <Col xs={24} sm={24} md={6} lg={6} className="footer-logo-col">
            <div className="footer-logo">
              <img
                src={
                  theme === "dark"
                    ? "/images/Pathwise Logo White.png"
                    : "/images/Pathwise Logo Black.png"
                }
                alt="Pathwise Logo"
                className="footer-logo-image"
              />
            </div>
          </Col>

          {/* Information Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Text className="footer-title">Information</Text>
            <div className="footer-links">
              <a className="footer-link" onClick={() => router.push("/about")}>
                Our Mentors
              </a>
              <a
                className="footer-link"
                onClick={() => router.push("/results")}
              >
                Outcomes Report
              </a>
              <a
                className="footer-link"
                onClick={() => router.push("/results")}
              >
                Fellow Stories
              </a>
              <a className="footer-link" onClick={() => router.push("/")}>
                FAQ
              </a>
            </div>
          </Col>

          {/* Company Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Text className="footer-title">Company</Text>
            <div className="footer-links">
              <a className="footer-link" onClick={() => router.push("/about")}>
                About
              </a>
              <a
                className="footer-link"
                onClick={() => router.push("/contact")}
              >
                Contact
              </a>
              <a
                className="footer-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog ↗
              </a>
            </div>
          </Col>

          {/* Industry Tracks Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Text className="footer-title">Fields of Mentorship</Text>
            <div className="footer-links">
              <a
                className="footer-link"
                onClick={() => router.push("/services")}
              >
                Tech (Software & Data)
              </a>
              <a
                className="footer-link"
                onClick={() => router.push("/services")}
              >
                Finance
              </a>
              <a
                className="footer-link"
                onClick={() => router.push("/services")}
              >
                US Admissions
              </a>
            </div>
          </Col>

          {/* Social Links */}
          <Col xs={12} sm={6} md={4} lg={4}>
            <Text className="footer-title">Social</Text>
            <div className="footer-links">
              <a
                className="footer-link"
                href="https://www.linkedin.com/in/quang1401/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="footer-link"
                href="https://www.facebook.com/pathwise.mentorship"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ↗
              </a>
              <a
                className="footer-link"
                href="https://www.instagram.com/pathwise.tech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <a
                className="footer-link"
                href="https://www.threads.com/@pathwise.tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                Threads ↗
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <Text className="footer-copyright">
              Copyright © 2025 thepathwise.org
            </Text>
          </div>
          <div className="footer-bottom-right">
            <a href="#" className="footer-bottom-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-bottom-link">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
