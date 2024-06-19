import React from "react";
import { Row, Col, Typography } from "antd";
import "./Features.css";

const { Title, Text } = Typography;

const Features = () => {
  return (
    <div className="features-container">
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Text className="feature-title">Feature</Text>
        </Col>
        <Col span={20}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="feature-item">
                <Text level={4} className="feature-heading">
                  10 buổi workshop
                </Text>
                <Text className="feature-content">
                  về toàn bộ quá trình apply internship từ resume, portfolio,
                  personal projects đến behavioral và technical interviews. Hàm
                  lượng kiến thức và thông tin được tổng hợp cần thiết, đúng
                  trọng tâm và cá nhân hóa
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div className="feature-item">
                <Text level={4} className="feature-heading">
                  Hướng dẫn trực tiếp
                </Text>
                <Text className="feature-content">
                  làm các project cá nhân 100% full-stack cùng các mentee khác
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div className="feature-item">
                <Text level={4} className="feature-heading">
                  Mock interview
                </Text>
                <Text className="feature-content">
                  cho các research lab và các công ty. Nhận được những cập nhật
                  mới nhất về thị trường job
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div className="feature-item">
                <Text level={4} className="feature-heading">
                  Cung cấp và hướng dẫn networking
                </Text>
                <Text className="feature-content">
                  để phục vụ quá trình apply, và hỗ trợ thăng tiến trong công
                  việc
                </Text>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Features;
