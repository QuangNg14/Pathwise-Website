import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, Typography, message } from "antd";
import { UploadOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/contexts/ThemeContext";
import "./MentorshipApplication.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MentorshipApplication = () => {
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [waitlistSelection, setWaitlistSelection] = useState("No");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl = "https://pathwise-website-server.onrender.com";

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Show success message when file is uploaded
    if (newFileList.length > 0 && newFileList[0].name) {
      toast.success(`File "${newFileList[0].name}" uploaded successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
            "Failed to submit the form. Please try again later.",
        );
      }

      const data = await res.json();

      if (data.success) {
        // Reset form and file list
        form.resetFields();
        setFileList([]);
        setWaitlistSelection("No");

        console.log("Form submitted successfully, showing notification...");

        // Show success notification with enhanced styling
        if (values.waitlistConsideration === "Yes") {
          console.log("Showing waitlist notification");

          toast.success("🎉 Application Submitted Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "success-toast",
            bodyClassName: "success-toast-body",
          });

          // Additional info toast
          setTimeout(() => {
            toast.info(
              "📞 Please message Tri Bui on Facebook to inform us about your waitlist consideration.",
              {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "info-toast",
              },
            );
          }, 1000);
        } else {
          console.log("Showing regular success notification");

          toast.success("🎉 Application Submitted Successfully!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "success-toast",
            bodyClassName: "success-toast-body",
          });

          // Additional info toast
          setTimeout(() => {
            toast.info(
              "✅ We will review your submission and get back to you shortly.",
              {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "info-toast",
              },
            );
          }, 1000);
        }
      } else {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.log("Error occurred:", error);
      // Show enhanced error notification
      toast.error("❌ Submission Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "error-toast",
        bodyClassName: "error-toast-body",
      });

      // Additional error details
      setTimeout(() => {
        toast.error(
          error.message ||
            "An unexpected error occurred. Please check your information and try again.",
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "error-details-toast",
          },
        );
      }, 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
    toast.error("⚠️ Form Validation Failed", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "error-toast",
    });

    // Additional validation details
    setTimeout(() => {
      toast.warning(
        "Please fill out all required fields correctly before submitting.",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "warning-toast",
        },
      );
    }, 500);
  };

  return (
    <div id="application" className="mentorship-app-section">
      <div className="mentorship-app-container">
        <div className="mentorship-app-left">
          <Title className="mentorship-app-title">Mentorship Application</Title>
          <Text className="mentorship-app-desc">
            Applications for 2026 are open! Please fill out the form to register
            for our mentorship program. We will review your application and get
            back to you as soon as possible.
          </Text>
          {/* <div className="deadline-notice">
            <Text className="deadline-text">
              📅 <strong>Application Deadline:</strong> January 26th, 2026
            </Text>
          </div> */}
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
                  <Select.Option value="Master">Master</Select.Option>
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
            <div className="mentorship-app-form-row">
              <Form.Item
                name="leetcode"
                label="LeetCode Link (Optional)"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="https://leetcode.com/u/yourprofile" />
              </Form.Item>
              <Form.Item
                name="github"
                label="GitHub Link (Optional)"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
                className="mentorship-app-form-col"
              >
                <Input placeholder="https://github.com/yourprofile" />
              </Form.Item>
            </div>
            <Form.Item
              name="waitlistConsideration"
              label="If not selected, do you want to be considered for the waitlist of this batch?"
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
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        className="custom-toast-container"
      />
    </div>
  );
};

export default MentorshipApplication;
