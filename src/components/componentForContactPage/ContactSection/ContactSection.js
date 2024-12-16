import React from "react";
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
  return (
    <div className="contact-section">
      <div className="contact-content">
        <Title level={2} className="contact-title">
          Hãy kết nối với chúng mình!{" "}
          {/* <span className="highlight">Hãy kết nối!!!</span> */}
        </Title>
        <Text className="contact-description">
          Xin vui lòng liên hệ với chúng mình qua những kênh sau.
        </Text>

        <div className="contact-methods">
          <div className="contact-item">
            <MailOutlined className="contact-icon" />
            <Text>Email: </Text>
            <a href="mailto:techprep.mentor@gmail.com" className="contact-link">
              techprep.mentor@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <FacebookOutlined className="contact-icon" />
            <Text>Facebook page: </Text>
            <a
              href="https://www.facebook.com/pathwise.techmentorship"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Pathwise Mentorship
            </a>
          </div>

          <div className="contact-item">
            <FacebookOutlined className="contact-icon" />
            <Text>Facebook community: </Text>
            <a
              href="https://www.facebook.com/groups/756561709660282"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Chia sẻ kinh nghiệm trong lĩnh vực Tech
            </a>
          </div>

          <div className="contact-item">
            <InstagramOutlined className="contact-icon" />
            <Text>Instagram: </Text>
            <a
              href="https://www.instagram.com/pathwise.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Instagram Pathwise
            </a>
          </div>

          <div className="contact-item">
            <LinkedinOutlined className="contact-icon" />
            <Text>LinkedIn: </Text>
            <a
              href="https://www.linkedin.com/in/quang1401/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Pathwise LinkedIn
            </a>
          </div>

          <div className="contact-item">
            <LinkOutlined className="contact-icon" />
            <Text>Đăng kí tham gia chương trình mentorship: </Text>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf44FrJ2powtp9MMvGfHcz8F7irZLyfjxaCkIpr-HAr0Fl4oQ/viewform?pli=1" // replace with the actual link
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
