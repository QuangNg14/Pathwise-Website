import React from "react";
import { Row, Col, Typography, Card, Carousel } from "antd";
import "./serviceRow.css";
import CustomCard from "../customCard/customCard";
const { Title, Text } = Typography;

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ServiceRow = () => (
  <Row gutter={16} style={{ padding: "64px 120px 80px 120px", height: 665, width: "100%" }}>
    <Col span={6}>
      <Text
        style={{
          display: "block",
          fontWeight: 400,
          fontSize: 50,
          lineHeight: "65.35px",
        }}
        level={2}
      >
        Our Services
      </Text>
    </Col>
    <Col span={18}>
      <div className="card-container">
        <CustomCard
          imgSrc="https://bmccprodstroac.blob.core.windows.net/uploads/2020/06/TOP2019_PeerMentoring_DSC3791-1.jpg"
          imgAlt="Full mentorship"
          title="Full mentorship"
          description="Tất cả các bạn mentee sẽ được các mentor trực tiếp theo sát và đồng hành cho đến khi nhận được offer internship. Có thể nhắn tin trực tiếp và đặt lịch hẹn với các mentor để hỏi về career, apply hoặc interview bất kì lúc nào"
        />
        <CustomCard
          imgSrc="https://cdn.corporatefinanceinstitute.com/assets/mock-interview-guide.jpeg"
          imgAlt="Mock Interview"
          title="Mock Interview"
          description="Các mentee có thể đặt lịch mock interview behavioral và technical bất kì lúc nào. Mentor sẽ giúp mentee chuẩn bị kỹ lưỡng trước khi apply vị trí mình mong muốn"
        />
        <CustomCard
          imgSrc="https://assets.entrepreneur.com/content/3x2/2000/1683118869-GettyImages-850630688.jpg"
          imgAlt="Sửa Resume và Profile"
          title="Sửa Resume và Profile"
          description="Hoàn thiện resume và profile, sửa luận và personal statements cho apply các research labs, software và data internship, tham gia làm dự án full-stack cùng các mentee khác"
        />
      </div>
    </Col>
  </Row>
);

export default ServiceRow;
