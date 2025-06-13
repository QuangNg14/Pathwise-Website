import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./MentorshipApplication.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MentorshipApplication = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [waitlistSelection, setWaitlistSelection] = useState("No");

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
                for the July 2025 batch (applying for Summer 2026 only), please
                message{" "}
                <a
                  href="https://www.facebook.com/tribuidinh0901/"
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
    <div className="mentorship-app-section">
      <div className="mentorship-app-container">
        <div className="mentorship-app-left">
          <Title className="mentorship-app-title">Mentorship Application</Title>
          <Text className="mentorship-app-desc">
            Please fill out the form to register for our mentorship program. We will review your application and get back to you as soon as possible.
          </Text>
          <div className="mentorship-app-image-wrapper">
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730176142/sr5gza9fnfa6buyxzhh7.png"
              alt="Mentorship Application"
              className="mentorship-app-image"
            />
          </div>
        </div>
        <div className="mentorship-app-right">
          <Form
            form={form}
            layout="vertical"
            name="mentorshipApplicationForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="mentorship-app-form"
          >
            <div className="mentorship-app-form-row">
              <Form.Item
                name="fullName"
                label="Full name"
                rules={[{ required: true, message: "Please enter your full name" }]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="Jane Doe" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="example@gmail.com" />
              </Form.Item>
            </div>
            <div className="mentorship-app-form-row">
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="+1 XXX-XXX-XXXX" />
              </Form.Item>
              <Form.Item
                name="school"
                label="School"
                rules={[{ required: true, message: "Please enter your school" }]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="Rice University" />
              </Form.Item>
            </div>
            <div className="mentorship-app-form-row">
              <Form.Item
                name="currentYear"
                label="Current academic year"
                rules={[{ required: true, message: "Please select your current year" }]}
                className="mentorship-app-form-col"
              >
                <Select placeholder="Select your current year">
                  <Select.Option value="Freshman">Freshman</Select.Option>
                  <Select.Option value="Sophomore">Sophomore</Select.Option>
                  <Select.Option value="Junior">Junior</Select.Option>
                  <Select.Option value="Senior">Senior</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="industryPreference"
                label="Industry"
                rules={[{ required: true, message: "Please select an industry" }]}
                className="mentorship-app-form-col"
              >
                <Select placeholder="Select the industry">
                  <Select.Option value="Investment Banking">Investment Banking</Select.Option>
                  <Select.Option value="Software Engineering">Software Engineering</Select.Option>
                  <Select.Option value="Data Engineering/Data Science/Machine Learning">
                    Data Engineering/Data Science/Machine Learning
                  </Select.Option>
                  <Select.Option value="Consulting">Consulting</Select.Option>
                  <Select.Option value="Finance (FP&A, corp fin, accounting,..)">
                    Finance (FP&A, corp fin, accounting,..)
                  </Select.Option>
                  <Select.Option value="Other">Other…</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="mentorship-app-form-row">
              <Form.Item
                name="linkedin"
                label="LinkedIn Link"
                rules={[
                  { required: true, message: "Please enter your LinkedIn profile link" },
                  { type: "url", message: "Please enter a valid LinkedIn URL" },
                ]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="https://linkedin.com/in/yourprofile" />
              </Form.Item>
              <Form.Item
                name="resume"
                label="Resume"
                rules={[{ required: true, message: "Please upload your resume" }]}
                className="mentorship-app-form-col"
              >
                <Upload
                  fileList={fileList}
                  beforeUpload={() => false}
                  onChange={handleUploadChange}
                  multiple={false}
                  accept=".pdf"
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Attach your resume ↑</Button>
                </Upload>
              </Form.Item>
            </div>
            <Form.Item
              name="waitlistConsideration"
              label="Do you want to be considered for the waitlist of this batch?"
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
                  Since you opted for the waitlist for the July 2025 batch
                  (applying for Summer 2026 only), please message{" "}
                  <a
                    href="https://www.facebook.com/tribuidinh0901/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tri Bui
                  </a>{" "}
                  to inform us.
                </Text>
              </div>
            )}
            <Form.Item
              name="message"
              label="Message for our Program"
            >
              <TextArea 
                placeholder="I'm thinking of ..." 
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <div className="mentorship-app-form-footer">
              <Text className="mentorship-app-privacy">
                By submitting this form you accept our <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </Text>
              <Button className="mentorship-app-submit" type="primary" htmlType="submit">
                Apply now
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MentorshipApplication;
