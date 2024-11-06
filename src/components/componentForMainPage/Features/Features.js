import React from "react";
import { Row, Col, Typography, Card } from "antd";
import "./Features.css";

const { Title, Text } = Typography;

const Features = () => {
  return (
    <div className="features-container">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={24} lg={4}>
          <Title
            level={2}
            className="feature-title"
            style={{
              fontWeight: 700,
              fontSize: 40,
              lineHeight: "65.35px",
              textAlign: "center",
              // color: "white",
            }}
          >
            Features
          </Title>
        </Col>
        <Col xs={24} md={24} lg={20}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card className="feature-item" bordered={false}>
                <Title level={4} className="feature-heading">
                  12 tuần hướng dẫn
                </Title>
                <Text className="feature-content">
                  về toàn bộ quá trình apply internship từ resume, portfolio,
                  personal projects đến behavioral và technical interviews. Hàm
                  lượng kiến thức và thông tin được tổng hợp cần thiết, đúng
                  trọng tâm và cá nhân hóa
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card className="feature-item" bordered={false}>
                <Title level={4} className="feature-heading">
                  Hướng dẫn trực tiếp
                </Title>
                <Text className="feature-content">
                  làm các project cá nhân 100% full-stack cùng các mentee khác
                  và tham gia các job conference hiệu quả
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card className="feature-item" bordered={false}>
                <Title level={4} className="feature-heading">
                  Mock interview
                </Title>
                <Text className="feature-content">
                  cho từng research lab và các công ty. Nhận được những cập nhật
                  mới nhất về thị trường job. Hiểu được rõ về các đặc điểm của
                  từng công ty
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card className="feature-item" bordered={false}>
                <Title level={4} className="feature-heading">
                  Hỗ trợ networking
                </Title>
                <Text className="feature-content">
                  để phục vụ quá trình xin referral các công ty, apply, và hỗ
                  trợ thăng tiến trong công việc
                </Text>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Features;
