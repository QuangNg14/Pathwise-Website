import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Card,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ApplySection.css";

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const ProgramInfoSection = () => (
  <div className="program-info-section">
    <Card className="program-info-card" bordered={false}>
      <Title level={3} className="program-info-title">
        Peer-to-peer Mentorship for Job Search
      </Title>
      <Text className="program-info-description">
        Pathwise Mentorship is a program that helps you find jobs at top global
        companies with mentors who have experience working at large corporations
        in the US, such as Big Tech, MBB, Big 4, and major banks.
      </Text>
      <Text className="program-info-description">
        Founded at the end of 2023, we have helped over 20 mentees secure
        multiple dream internship and new grad offers in the US.
      </Text>
      <Text className="program-info-description">
        For more detailed information about the program, please visit:
      </Text>
      <ul className="program-links">
        <li>
          <Link href="https://www.thepathwise.org/" target="_blank">
            Website
          </Link>
        </li>
        <li>
          <Link
            href="https://www.facebook.com/pathwise.techmentorship/"
            target="_blank"
          >
            Facebook Page
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/pathwise.tech/" target="_blank">
            Instagram Tech
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/pathwise.fin/" target="_blank">
            Instagram Finance
          </Link>
        </li>
        <li>
          <Link
            href="https://www.facebook.com/groups/75656170966028"
            target="_blank"
          >
            Facebook Group
          </Link>
        </li>
      </ul>
    </Card>
  </div>
);

const ApplySection = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  return (
    <div className="form-section">
      <div className="form-container">
        <ProgramInfoSection />
        <Title level={2} className="form-title">
          Internship/New Grad Mentorship Application
        </Title>
        <Text className="form-description">
          The application form for this cohort is officially closed. We are no
          longer accepting applications. Please check back later for future
          cohorts.
        </Text>
        <Form
          form={form}
          layout="vertical"
          name="mentorshipForm"
          className="ant-form-custom"
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="John Doe" disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="johndoe@example.com" disabled />
          </Form.Item>
          <Form.Item>
            <Button
              className="submit-button"
              type="primary"
              htmlType="submit"
              disabled
            >
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ApplySection;
