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
import "./FormSection.css";

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const ProgramInfoSection = () => (
  <div className="program-info-section">
    <Card className="program-info-card" bordered={false}>
      <Title level={3} className="program-info-title">
        Peer-to-peer Mentorship for Job Search
      </Title>
      <Text className="program-info-description">
        Pathwise Mentorship là một program giúp bạn tìm việc tại các công ty
        hàng đầu thế giới với những mentors có kinh nghiệm làm việc ở các tập
        đoàn lớn tại Mỹ như Big Tech, MBB, Big 4 và Ngân hàng lớn.
      </Text>
      <Text className="program-info-description">
        Được thành lập từ cuối năm 2023, chúng mình đã giúp 20+ bạn mentee đạt
        được nhiều internship/new grad offers mơ ước tại US.
      </Text>
      <Text className="program-info-description">
        Để biết thêm thông tin chi tiết về chương trình, hãy truy cập:
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

const FormSection = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

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
        // Clear the form fields and file list
        form.resetFields();
        setFileList([]);

        // Display success notification
        message.success({
          content:
            "Form submitted successfully! We will review your application and get back to you shortly.",
          duration: 5, // Notification stays for 5 seconds
          className: "success-message",
        });
      } else {
        // Display error notification
        message.error({
          content: `Error: ${
            data.message || "Something went wrong. Please try again."
          }`,
          duration: 5,
          className: "error-message",
        });
      }
    } catch (error) {
      // Display network error notification
      message.error({
        content: `Network error: ${error.message}`,
        duration: 5,
        className: "error-message",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    // Display validation error notification
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
          Vui lòng điền vào mẫu đơn bên dưới để đăng ký chương trình mentorship
          của chúng tôi. Chúng tôi sẽ xem xét đơn đăng ký của bạn và phản hồi
          trong thời gian sớm nhất.
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
            label="Họ và tên"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="johndoe@example.com" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="+1234567890" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Bạn đang sinh sống ở đâu?"
            rules={[{ required: true, message: "Please select your location" }]}
          >
            <Select placeholder="Select your location">
              <Select.Option value="Vietnam">Vietnam</Select.Option>
              <Select.Option value="USA">USA</Select.Option>
              <Select.Option value="Australia">Australia</Select.Option>
              <Select.Option value="Singapore">Singapore</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="school"
            label="Bạn đang học tại trường nào?"
            rules={[{ required: true, message: "Please enter your school" }]}
          >
            <Input placeholder="Harvard University" />
          </Form.Item>

          <Form.Item
            name="currentYear"
            label="Hiện tại bạn đang là"
            rules={[
              { required: true, message: "Please select your current year" },
            ]}
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
            label="Bạn đang muốn tập trung tìm việc của ngành nào?"
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

          <Form.Item
            name="helpDescription"
            label="(Optional) Bạn hãy trả lời câu hỏi bằng tiếng anh: What do you need help with and what do you want to gain from this program?"
          >
            <TextArea rows={4} placeholder="Be as specific as you can" />
          </Form.Item>

          <Form.Item
            name="resume"
            label="Bạn hãy upload most updated resume của mình"
            rules={[{ required: true, message: "Please upload your resume" }]}
          >
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="questionsForUs"
            label="Bạn có câu hỏi gì cho chúng mình không?"
          >
            <TextArea rows={2} placeholder="Your question here..." />
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

export default FormSection;
