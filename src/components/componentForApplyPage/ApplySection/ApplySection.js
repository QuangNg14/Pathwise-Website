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
    <Card className="program-info-card" variant="borderless">
      <Title level={3} className="program-info-title">
        Peer-to-peer Mentorship for Job Search
      </Title>
      <Text className="program-info-description">
        Pathwise Mentorship is a program that helps you find jobs at top global
        companies with mentors who have experience working at large corporations
        in the US, such as Big Tech, MBB, Big 4, and major banks.{" "}
      </Text>
      <Text className="program-info-description">
        Founded at the end of 2023, we have helped over 20 mentees secure
        multiple dream internship and new grad offers in the US.{" "}
      </Text>
      <Text className="program-info-description">
        For more detailed information about the program, please visit:{" "}
      </Text>
      <ul className="program-links">
        <li>
          <Link href="https://www.thepathwise.org/" target="_blank">
            Website
          </Link>
        </li>
        <li>
          <Link
            href="https://www.facebook.com/pathwise.mentorship/"
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
  const [waitlistSelection, setWaitlistSelection] = useState("No");

  // Fetch the backend URL from the environment variable
  const apiBaseUrl = "https://pathwise-website-server.onrender.com";

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key !== "resume") {
        formData.append(key, values[key]);
      }
    }

    if (fileList.length > 0) {
      formData.append("resume", fileList[0].originFileObj);
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/forms/submit`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit the form. Please try again later.");
      }

      const data = await res.json();

      if (data.success) {
        form.resetFields();
        setFileList([]);
        if (values.waitlistConsideration === "Yes") {
          message.success({
            content: (
              <span>
                Form submitted successfully! Since you opted for the waitlist
                for the Batch 6/2025 (January 2026 - June 2026), please message{" "}
                <a
                  href="https://www.facebook.com/nguyen.banhs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tri Bui
                </a>{" "}
                to inform us, and we will consider your application.
              </span>
            ),
            duration: 5,
            className: "success-message",
          });
        } else {
          message.success({
            content:
              "Form submitted successfully! We will review your application and get back to you shortly.",
            duration: 5,
            className: "success-message",
          });
        }
      } else {
        message.error({
          content: `Error: ${
            data.message || "Something went wrong. Please try again."
          }`,
          duration: 5,
          className: "error-message",
        });
      }
    } catch (error) {
      message.error({
        content: `Network error: ${error.message}`,
        duration: 5,
        className: "error-message",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error({
      content: "Please fill out all required fields correctly.",
      duration: 5,
      className: "error-message",
    });
  };

  return (
    <div className="form-section">
      <div className="form-container">
        <ProgramInfoSection />
        <Title level={2} className="form-title">
          Internship/New Grad Mentorship Application
        </Title>
        <Text className="form-description">
          Applications for 2026 are open! Please fill out the form below to
          register for our mentorship program. We will review your application
          and get back to you as soon as possible.
        </Text>
        <Form
          form={form}
          layout="vertical"
          name="mentorshipForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="ant-form-custom"
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <div className="form-row">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="form-col"
            >
              <Input placeholder="johndoe@example.com" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
              className="form-col"
            >
              <Input placeholder="+1234567890" />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="school"
              label="School"
              rules={[{ required: true, message: "Please enter your school" }]}
              className="form-col"
            >
              <Input placeholder="University of Pennsylvania" />
            </Form.Item>

            <Form.Item
              name="currentYear"
              label="Academic Year"
              rules={[
                { required: true, message: "Please select your current year" },
              ]}
              className="form-col"
            >
              <Select placeholder="Select your current year">
                <Select.Option value="Freshman">Freshman</Select.Option>
                <Select.Option value="Sophomore">Sophomore</Select.Option>
                <Select.Option value="Junior">Junior</Select.Option>
                <Select.Option value="Senior">Senior</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="industryPreference"
            label="What industry are you focusing on for job search?"
            rules={[{ required: true, message: "Please select an industry" }]}
          >
            <Select placeholder="Select the industry">
              <Select.Option value="Investment Banking">
                Investment Banking
              </Select.Option>
              <Select.Option value="Software Engineering">
                Software Engineering
              </Select.Option>
              <Select.Option value="Data Engineering/Data Science/Machine Learning">
                Data Engineering/Data Science/Machine Learning
              </Select.Option>
              <Select.Option value="Consulting">Consulting</Select.Option>
              <Select.Option value="Other">Other…</Select.Option>
            </Select>
          </Form.Item>

          <div className="form-row">
            <Form.Item
              name="linkedin"
              label="LinkedIn Link"
              rules={[
                {
                  required: true,
                  message: "Please enter your LinkedIn profile link",
                },
                { type: "url", message: "Please enter a valid LinkedIn URL" },
              ]}
              className="form-col"
            >
              <Input placeholder="https://linkedin.com/in/yourprofile" />
            </Form.Item>

            <Form.Item
              name="resume"
              label="Upload your latest Resume (PDF format)"
              rules={[{ required: true, message: "Please upload your resume" }]}
              className="form-col"
            >
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleUploadChange}
                multiple={false}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {fileList.length > 0 ? fileList[0].name : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="leetcode"
              label="LeetCode Link (Optional)"
              rules={[{ type: "url", message: "Please enter a valid URL" }]}
              className="form-col"
            >
              <Input placeholder="https://leetcode.com/u/yourprofile" />
            </Form.Item>

            <Form.Item
              name="github"
              label="GitHub Link (Optional)"
              rules={[{ type: "url", message: "Please enter a valid URL" }]}
              className="form-col"
            >
              <Input placeholder="https://github.com/yourprofile" />
            </Form.Item>
          </div>

          <Form.Item
            name="waitlistConsideration"
            label="Do you want to be considered for the waitlist for the Batch 6/2025? (January 2026 - June 2026)"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Select
              placeholder="Select your option"
              onChange={(value) => setWaitlistSelection(value)}
            >
              <Select.Option value="No">No</Select.Option>
              <Select.Option value="Yes">Yes</Select.Option>
            </Select>
          </Form.Item>

          {waitlistSelection === "Yes" && (
            <div className="waitlist-message">
              <Text type="secondary">
                Since you opted for the waitlist for the Batch 6/2025 (January
                2026 - June 2026), please message{" "}
                <a
                  href="https://www.facebook.com/nguyen.banhs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tri Bui
                </a>{" "}
                to inform us.
              </Text>
            </div>
          )}

          <Form.Item name="message" label="Message for our Program (Optional)">
            <TextArea rows={4} placeholder="I'm thinking of ..." />
          </Form.Item>

          <Form.Item>
            <Button className="submit-button" type="primary" htmlType="submit">
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ApplySection;
