import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  message,
  notification,
} from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./MentorshipApplication.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MentorshipApplication = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [waitlistSelection, setWaitlistSelection] = useState("No");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl = "https://pathwise-website-server.onrender.com";

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Show success message when file is uploaded
    if (newFileList.length > 0 && newFileList[0].name) {
      message.success({
        content: `File "${newFileList[0].name}" uploaded successfully!`,
        duration: 3,
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      });
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);

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
        const errorData = await res.json();
        throw new Error(
          errorData.message ||
            "Failed to submit the form. Please try again later."
        );
      }

      const data = await res.json();

      if (data.success) {
        // Reset form and file list
        form.resetFields();
        setFileList([]);
        setWaitlistSelection("No");

        // Show success notification with enhanced styling
        if (values.waitlistConsideration === "Yes") {
          notification.success({
            message: "🎉 Application Submitted Successfully!",
            description: (
              <div>
                <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                  Thank you for your application! Since you opted for the
                  waitlist for the July 2025 batch (applying for Summer 2026
                  only), please message{" "}
                  <a
                    href="https://www.facebook.com/tribuidinh0901/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#C45A1D",
                      textDecoration: "underline",
                      fontWeight: "500",
                    }}
                  >
                    Tri Bui
                  </a>{" "}
                  to inform us, and we will consider your application.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#52c41a",
                    fontWeight: "500",
                  }}
                >
                  This notification will disappear in 4 seconds.
                </p>
              </div>
            ),
            duration: 4,
            icon: (
              <CheckCircleOutlined
                style={{ color: "#52c41a", fontSize: "20px" }}
              />
            ),
            style: {
              backgroundColor: "#f6ffed",
              border: "2px solid #b7eb8f",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(82, 196, 26, 0.15)",
            },
            placement: "topRight",
          });
        } else {
          notification.success({
            message: "🎉 Application Submitted Successfully!",
            description: (
              <div>
                <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                  Thank you for your application! We will review your submission
                  and get back to you shortly.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#52c41a",
                    fontWeight: "500",
                  }}
                >
                  This notification will disappear in 3 seconds.
                </p>
              </div>
            ),
            duration: 3,
            icon: (
              <CheckCircleOutlined
                style={{ color: "#52c41a", fontSize: "20px" }}
              />
            ),
            style: {
              backgroundColor: "#f6ffed",
              border: "2px solid #b7eb8f",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(82, 196, 26, 0.15)",
            },
            placement: "topRight",
          });
        }
      } else {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      // Show enhanced error notification
      notification.error({
        message: "❌ Submission Failed",
        description: (
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>
              {error.message ||
                "An unexpected error occurred. Please check your information and try again."}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#ff4d4f",
                fontWeight: "500",
              }}
            >
              This notification will disappear in 4 seconds.
            </p>
          </div>
        ),
        duration: 4,
        icon: (
          <ExclamationCircleOutlined
            style={{ color: "#ff4d4f", fontSize: "20px" }}
          />
        ),
        style: {
          backgroundColor: "#fff2f0",
          border: "2px solid #ffccc7",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(255, 77, 79, 0.15)",
        },
        placement: "topRight",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "⚠️ Form Validation Failed",
      description: (
        <div>
          <p style={{ marginBottom: "8px", fontSize: "14px" }}>
            Please fill out all required fields correctly before submitting.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#ff4d4f",
              fontWeight: "500",
            }}
          >
            This notification will disappear in 3 seconds.
          </p>
        </div>
      ),
      duration: 3,
      icon: (
        <ExclamationCircleOutlined
          style={{ color: "#ff4d4f", fontSize: "20px" }}
        />
      ),
      style: {
        backgroundColor: "#fff2f0",
        border: "2px solid #ffccc7",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(255, 77, 79, 0.15)",
      },
      placement: "topRight",
    });
  };

  return (
    <div id="application" className="mentorship-app-section">
      <div className="mentorship-app-container">
        <div className="mentorship-app-left">
          <Title className="mentorship-app-title">Mentorship Application</Title>
          <Text className="mentorship-app-desc">
            Please fill out the form to register for our mentorship program. We
            will review your application and get back to you as soon as
            possible.
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
            requiredMark={(label, { required }) => (
              <>
                {label}
                {required && (
                  <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
                )}
              </>
            )}
            colon={false}
          >
            <div className="mentorship-app-form-row">
              <Form.Item
                name="fullName"
                label="Full name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                  {
                    min: 2,
                    message: "Full name must be at least 2 characters",
                  },
                ]}
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
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  { min: 10, message: "Please enter a valid phone number" },
                ]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="+1 XXX-XXX-XXXX" />
              </Form.Item>
              <Form.Item
                name="school"
                label="School"
                rules={[
                  { required: true, message: "Please enter your school" },
                  {
                    min: 2,
                    message: "School name must be at least 2 characters",
                  },
                ]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="Rice University" />
              </Form.Item>
            </div>
            <div className="mentorship-app-form-row">
              <Form.Item
                name="currentYear"
                label="Current academic year"
                rules={[
                  {
                    required: true,
                    message: "Please select your current year",
                  },
                ]}
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
                rules={[
                  { required: true, message: "Please select an industry" },
                ]}
                className="mentorship-app-form-col"
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
                  <Select.Option value="Finance (FP&A, corp fin, accounting,..">
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
                  {
                    required: true,
                    message: "Please enter your LinkedIn profile link",
                  },
                  { type: "url", message: "Please enter a valid LinkedIn URL" },
                ]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="https://linkedin.com/in/yourprofile" />
              </Form.Item>
              <Form.Item
                name="resume"
                label="Resume"
                rules={[
                  { required: true, message: "Please upload your resume" },
                ]}
                className="mentorship-app-form-col"
              >
                <Upload
                  fileList={fileList}
                  beforeUpload={() => false}
                  onChange={handleUploadChange}
                  multiple={false}
                  accept=".pdf"
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                    showDownloadIcon: false,
                  }}
                  className="resume-upload"
                >
                  <Button icon={<UploadOutlined />}>
                    {fileList.length > 0
                      ? `Selected: ${fileList[0].name}`
                      : "Attach your resume ↑"}
                  </Button>
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
              label="Message for our Program (Optional)"
            >
              <TextArea
                placeholder="I'm thinking of ..."
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <div className="mentorship-app-form-footer">
              <Text className="mentorship-app-privacy">
                By submitting this form you accept our{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </Text>
              <Button
                className="mentorship-app-submit"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Apply now"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MentorshipApplication;
