import React from "react";
import { useRouter } from "next/navigation";
import { Typography } from "antd";
import {
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import "./ContactSection.css";

const { Title, Text } = Typography;

const ContactSection = () => {
  const router = useRouter();

  const handleApplyClick = (e) => {
    e.preventDefault();
    router.push("/#application");
  };

  return (
    <div className="contact-section">
      <div className="contact-content">
        <Title level={2} className="contact-title">
          Connect with us!{" "}
          {/* <span className="highlight">Let's connect!!!</span> */}
        </Title>
        <Text className="contact-description">
          Please feel free to reach out to us through the following channels.
        </Text>

        <div className="contact-methods">
          <div className="contact-item">
            <LinkOutlined className="contact-icon" />
            <div className="contact-item-content">
              <Text className="contact-text">
                Apply for the mentorship program:
              </Text>
              <button
                onClick={handleApplyClick}
                className="contact-link apply-button"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="contact-item">
            <MailOutlined className="contact-icon" />
            <div className="contact-item-content">
              <Text className="contact-text">Email:</Text>
              <a
                href="mailto:techprep.mentor@gmail.com"
                className="contact-link"
              >
                techprep.mentor@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-item">
            <FacebookOutlined className="contact-icon" />
            <div className="contact-item-content">
              <Text className="contact-text">Facebook page:</Text>
              <a
                href="https://www.facebook.com/pathwise.mentorship"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Pathwise Mentorship
              </a>
            </div>
          </div>

          <div className="contact-item">
            <FacebookOutlined className="contact-icon" />
            <div className="contact-item-content">
              <Text className="contact-text">Facebook community:</Text>
              <a
                href="https://www.facebook.com/groups/756561709660282"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Share experiences in the Tech field
              </a>
            </div>
          </div>

          <div className="contact-item">
            <InstagramOutlined className="contact-icon" />
            <div className="contact-item-content">
              <Text className="contact-text">Instagram:</Text>
              <a
                href="https://www.instagram.com/pathwise.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Instagram Pathwise
              </a>
            </div>
          </div>

          <div className="contact-item">
            <LinkedinOutlined className="contact-icon" />
            <div className="contact-item-content">
              <Text className="contact-text">LinkedIn:</Text>
              <a
                href="https://www.linkedin.com/in/quang1401/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Pathwise LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
