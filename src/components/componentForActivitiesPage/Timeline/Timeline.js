import React from "react";
import { Typography } from "antd";
import "./Timeline.css";

const { Title, Text } = Typography;

const timelineData = [
  {
    title: "Profile Review",
    date: "Week 1 + 2",
    description:
      "Hướng dẫn cách xây dựng các Resume chuyên nghiệp tuỳ vào từng công ty muốn apply và giới thiệu các công cụ AI hỗ trợ xây dựng hồ sơ. Hoàn thiện hồ sơ LinkedIn và GitHub nếu có.",
    tag: "Profile",
  },
  {
    title: "Technical Project Planning",
    date: "Week 3",
    description:
      "Review những ngôn ngữ và công cụ phổ biến cho các internship jobs hiện nay và các tech-stack thịnh hành. Hướng dẫn xây dựng một technical project mà đem lại impact trong cộng đồng.",
    tag: "Project",
  },
  {
    title: "Workshop",
    date: "Week 4 + 5",
    description:
      "Tổ chức các buổi workshop hướng dẫn các kiến thức technical để build full stack cloud and AI projects như MERN, Git, AWS, OpenAI API, Java and Golang và công cụ quản lý project Jira.",
    tag: "Skills",
  },
  {
    title: "Applications",
    date: "Week 6",
    description:
      "Hướng dẫn các cách hiệu quả để apply internships trong các ngành software, data và finance ở Mỹ. Giới thiệu những tips and tricks để học viên có khả năng cao nhất được gọi interview.",
    tag: "Applying",
  },
  {
    title: "Leetcode",
    date: "Week 7 + 8",
    description:
      "Hướng dẫn học viên chi tiết cách sử dụng Leetcode hiệu quả nhất để ôn tập các câu hỏi về technical. Tổ chức các buổi luyện leetcode theo nhóm hàng tuần và chữa các bài live coding.",
    tag: "Practice",
  },
  {
    title: "Online Assessments",
    date: "Week 9",
    description:
      "Học viên sẽ được access resource đặc biệt để chuẩn bị riêng cho từng bài kiểm tra online của từng công ty để có kết quả cao nhất.",
    tag: "Assessment",
  },
  {
    title: "Behavioral Interview",
    date: "Week 10",
    description:
      "Học viên sẽ được chuẩn bị chi tiết các câu trả lời theo STAR method được cá nhân hoá với từng bộ hồ sơ, biết về đặc điểm của từng công ty và có thể mock interview với mentor khi cần.",
    tag: "Interview",
  },
  {
    title: "Technical Interview",
    date: "Week 11",
    description:
      "Học viên sẽ được chuẩn bị kĩ lưỡng về nhiều dạng câu hỏi technical như Leetcode, Object-oriented programming, hay system design. Có thể mock interview với mentor khi cần.",
    tag: "Interview",
  },
  {
    title: "Networking",
    date: "Week 12",
    description:
      "Được hướng dẫn cách để nói chuyện với các công ty trong conference, xin referral, cách viết cold email hiệu quả và được add vào network có các mentor và các bạn nhiều kinh nghiệm.",
    tag: "Networking",
  },
];

const Timeline = () => {
  return (
    <div className="timeline-section">
      <Title level={2} className="timeline-title">
        Mentorship Program Timeline
      </Title>
      <div className="timeline-container">
        {timelineData.map((event, index) => (
          <div
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            key={index}
          >
            <div className="content">
              <span className="event-date">{event.date}</span>
              <Title
                level={4}
                className="event-title"
                style={{ color: "var(--secondary-color)" }}
              >
                {event.title}
              </Title>
              <Text className="event-description">{event.description}</Text>
              <span className={`event-tag ${event.tag.toLowerCase()}`}>
                {event.tag}
              </span>
            </div>
          </div>
        ))}
        {/* Vertical timeline line */}
        <div className="timeline-line"></div>
      </div>
    </div>
  );
};

export default Timeline;
