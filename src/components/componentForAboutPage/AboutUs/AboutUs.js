import React from "react";
import { Row, Col, Typography } from "antd";
import "./AboutUs.css";

const { Title, Text } = Typography;

const teamMembers = [
  {
    name: "Quang Nguyen",
    role: "Founder",
    description: [
      "Anh Nhật Quang hiện đang làm Kỹ sư phần mềm tại Microsoft, và anh cũng từng làm thực tập vị trí kĩ sư phần mềm tại NVIDIA (hè 2023) và Facebook (hè 2022).",
      "Đạt học bổng toàn phần ngành Khoa học Máy tính trị giá $73,000/năm cho 4 năm học tại Đại học Rice.",
      "Chủ tịch câu lạc bộ Rice Apps (Rice Software Engineering Club) tại Đại học Rice, từng mentor và giảng dạy về phát triển web và ứng dụng di động chuyên nghiệp cho hơn 60 thành viên trong câu lạc bộ.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730786179/qz0r41jqmatncyl9h6py.jpg",
  },
  {
    name: "Tri Bui",
    role: "Co-Founder",
    description: [
      "Anh Đình Trí hiện đang làm Quản trị Rủi ro tại công ty Revantage thuộc tập đoàn Blackstone và thực tập Kỹ sư Phần mềm tại Daikin, DetectAuto, và Deloitte Vietnam.",
      "Founder/CEO của Công ty TNHH Esmart Solutions, cung cấp giải pháp truyền thông và công nghệ cho các doanh nghiệp vừa và nhỏ tại Việt Nam.",
      "Chủ tịch CLB Doanh nhân và CLB Đầu tư tại Macalester College. Đạt nhiều giải thưởng về công nghệ, tài chính và khởi nghiệp với tổng giá trị giải thưởng hơn 15,000 USD.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730786150/vqyqmxshnub26yu08dpr.jpg",
  },
  {
    name: "Anh Ngo",
    role: "Mentor",
    description: [
      "Chị Minh Anh hiện đang làm chuyên viên phân tích ngân hàng đầu tư (Investment Banking Summer Analyst) tại Deutsche Bank.",
      "Chị cũng đã đạt học bổng ngành Kinh Tế tại Đại học Pennsylvania (UPenn).",
      "Phó Chủ tịch của Câu lạc bộ Tài chính Wharton và là thành viên của Hội đồng Tư vấn Sinh viên Quốc tế tại UPenn.",
      "Có nhiều kinh nghiệm làm việc tại UPenn Career Services, đã hỗ trợ sửa resume và định hướng nghề nghiệp cho hơn 200 sinh viên.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730176141/tfiotmhqb6vpkofuh5py.jpg",
  },
  {
    name: "Lam Nguyen",
    role: "Mentor",
    description: [
      "Anh Lâm hiện đang là thực tập Kỹ sư Phần mềm tại Microsoft (các năm 2022, 2023, 2024) và Amazon (thu 2023).",
      "Đạt học bổng toàn phần bậc cao học ngành Khoa học Máy tính tại Đại học Case Western Reserve.",
      "Phó Chủ tịch của Hacker Society, luôn có tên trong danh sách danh dự Dean’s High Honors List, và được chọn tham gia đội tuyển ICPC khu vực Đông Bắc Trung Hoa Kỳ (ECNA) 3 năm liên tiếp.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730177777/n2i5vai8ckoagxbb3gm5.jpg",
  },
];

const AboutUs = () => (
  <div className="about-us-container">
    <Title level={2} className="about-us-title">
      Founding Team
    </Title>
    <Text className="about-us-intro">
      Chúng mình là những du học sinh Mỹ đã trải qua nhiều khó khăn trong quá
      trình học tập và tìm việc làm tại đây. Thấu hiểu những khó khăn của việc
      nộp hồ sơ hàng trăm chỗ mà không nhận được cái interview nào, Pathwise
      Mentorship được thành lập với sứ mệnh xây dựng một cộng đồng để truyền lại
      những kiến thức và kinh nghiệm giúp các bạn Việt Nam tìm được những công
      việc ước mơ tại nơi đây.
    </Text>
    {teamMembers.map((member, index) => (
      <Row
        className="member-row"
        align="middle"
        justify="center"
        key={index}
        gutter={[32, 32]}
      >
        <Col xs={24} md={14} className="description-column">
          <Text className="member-name">{member.name.toUpperCase()}</Text>
          {member.description.map((paragraph, idx) => (
            <Text key={idx} className="member-description">
              {paragraph}
            </Text>
          ))}
        </Col>
        <Col xs={24} md={10} className="image-column">
          <div className="role-label">{member.role.toUpperCase()}</div>
          <img src={member.image} alt={member.name} className="member-image" />
        </Col>
      </Row>
    ))}
  </div>
);

export default AboutUs;
