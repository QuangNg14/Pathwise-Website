import React, { useState } from "react";
import { Card, Typography, Button } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./ServiceCards.css";

const { Title, Text } = Typography;

const services = [
  {
    title: "Internships/Research Finding for Freshman & Sophomore",
    description:
      "Chương trình của chúng mình sẽ hỗ trợ các học viên năm nhất/năm hai tìm các vị trí thực tập và research trong ngành Software Engineering and Data. Các bạn học viên sẽ được hướng dẫn bài bản cách để chuẩn bị hồ sơ hiệu quả, làm các technical project có impact cho cộng đồng, luyện phỏng vấn và đuọc sửa luận để apply cẩn thận.",
    details: [
      "Phân tích các hồ sơ hiện có (Resume, LinkedIn, GitHub, v.v.) để xác định điểm mạnh và điểm yếu. Xây dựng các câu chuyện cá nhân đủ thuyết phục, nêu bật các kỹ năng, kinh nghiệm và thành tích liên quan.",
      "Tham gia 8 buổi học tương tác bao gồm các kỹ năng và kiến thức cần thiết liên quan đến chuyên ngành. Các buổi học có thể bao gồm đào tạo kỹ thuật, chuẩn bị phỏng vấn và định hướng phát triển sự nghiệp",
      "Ghép vào nhóm để làm 1 dự án công nghệ hoàn chỉnh trong lĩnh vực (chuyên ngành) Công nghệ phần mềm hoặc Dữ liệu.",
    ],
    start: "Jan 2025",
    duration: "12 tuần",
    people: "5 - 10 mentee",
    fee: "Chi phí - liên hệ",
  },
  {
    title: "Internships/New Grad Finding for Juniors & Seniors",
    description:
      "Chương trình của chúng mình sẽ hỗ trợ các học viên năm ba/năm tư tìm các vị trí thực tập và new grad trong ngành Software Engineering and Data. Các bạn học viên sẽ được luyện tập behavioral và technical interview một cách cẩn thận. Được lập nhóm để cùng nhau luyện leetcode. Được liên tục cập nhật các cơ hội thực tập, các chương trình và program đặc biệt, và được truy cập resource đặc biệt để chuẩn bị cho từng công ty.",
    details: [
      "Truy cập tất cả các tài liệu học tập và phát triển, bao gồm các slide buổi học, bản ghi, báo cáo, khóa học phát triển kỹ năng và tài liệu thực hành phỏng vấn.",
      "Hỗ trợ Tìm kiếm Thực tập: Liên tục cập nhật các cơ hội thực tập, các chương trình và program đặc biệt liên quan thông qua các thông báo thực tập cá nhân, cập nhật ngành và quyền truy cập vào các bảng thực tập độc quyền. (6-8 lần/tuần).",
      "Chia sẻ & Hỗ trợ Cộng đồng: Kết nối với những người tìm kiếm thực tập khác thông qua các diễn đàn trực tuyến và trò chuyện nhóm để chia sẻ kinh nghiệm, học hỏi lẫn nhau và giữ động lực.",
    ],
    start: "May 2025",
    duration: "12 tuần",
    people: "10 - 15 mentee",
    fee: "Chi phí - liên hệ",
  },
  {
    title: "Investment Banking & Finance (Coming Soon)",
    description:
      "Đây là chương trình chúng mình dự định bắt đầu trong tương lai gần. Sẽ có thể giúp đỡ các bạn học viên tìm việc và apply các vị trí Finance và Investment Banking.",
    details: [
      "Tìm hiểu về ngành Finance và Investment Banking.",
      "Được hướng dẫn chi cách để xây dựng hồ sơ để có thể apply ngành này.",
      "Học tập cách network mọi người trong ngành Finance hiệu quả để có thể có được phỏng vấn.",
    ],
    start: "May 2025",
    duration: "6 tuần",
    people: "~5 mentee",
    fee: "Chi phí - liên hệ",
  },
  {
    title: "Frequent Workshops and Fireside chat with Professionals",
    description:
      "Chúng mình sẽ thường xuyên tổ chức các buổi trò chuyện thân mật và chia sẻ từ các chuyên gia trong các ngành Software, Data, Machine Learning, AI, Finance và Investment Banking.",
    details: [
      "Được nói chuyện với những người có kinh nghiệm apply thành công internship và new grad jobs trong những năm khó khăn gần đây.",
      "Lắng nghe chia sẻ về công việc hiện tại trong các ngành hot như Software, Data và Investment Banking.",
      "Chia sẻ các tips/tricks quan trọng để các học viên tăng khả năng apply thành công cho kì apply tới.",
    ],
    start: "Feb 2025",
    duration: "1 buổi mỗi 2 tuần",
    people: "Không giới hạn",
    fee: "Miễn phí",
  },
];

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="service-card">
      <div className="service-header">
        <Title level={4}>{service.title}</Title>
        <Text>{service.description}</Text>
      </div>
      <div className="service-info">
        <div className="info-item">
          <CalendarOutlined className="icon" />
          <Text>{service.start}</Text>
        </div>
        <div className="info-item">
          <ClockCircleOutlined className="icon" />
          <Text>{service.duration}</Text>
        </div>
        <div className="info-item">
          <UsergroupAddOutlined className="icon" />
          <Text>{service.people}</Text>
        </div>
        <div className="info-item">
          <DollarOutlined className="icon" />
          <Text>{service.fee}</Text>
        </div>
      </div>
      <Button
        type="primary"
        className="expand-button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide Details" : "View Details"}
      </Button>
      {expanded && (
        <ul className="service-details">
          {service.details.map((detail, index) => (
            <li key={index}>
              <Text>{detail}</Text>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

const ServicesSection = () => {
  return (
    <div className="services-section">
      <Title level={2}>Our Services</Title>
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
      <div className="global-action-buttons">
        <Button
          className="custom-action-button"
          href="https://docs.google.com/presentation/d/14pTfUPVtN8RYuKgmeKDaTrgdQ8lbT0XGkvVEZIElhto/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
        <Button
          className="custom-action-button"
          href="https://docs.google.com/forms/d/e/1FAIpQLSf44FrJ2powtp9MMvGfHcz8F7irZLyfjxaCkIpr-HAr0Fl4oQ/viewform?pli=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default ServicesSection;
