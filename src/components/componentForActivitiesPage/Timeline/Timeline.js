import React from "react";
import { Typography } from "antd";
import "./Timeline.css";

const { Title, Text } = Typography;

const timelineData = [
  {
    title: "Profile Review",
    date: "Week 1 + 2",
    description:
      "Learn how to create professional resumes tailored to each company and get introduced to AI tools for building your profile. Complete your LinkedIn and GitHub profiles if applicable.",
    tag: "Profile",
  },
  {
    title: "Technical Project Planning",
    date: "Week 3",
    description:
      "Review popular languages and tools for current internship jobs and trending tech stacks. Get guidance on building a technical project that creates a meaningful impact in the community.",
    tag: "Project",
  },
  {
    title: "Workshop",
    date: "Week 4 + 5",
    description:
      "Attend workshops to learn technical skills for building full-stack cloud and AI projects using MERN, Git, AWS, OpenAI API, Java, Golang, and project management tools like Jira.",
    tag: "Skills",
  },
  {
    title: "Applications",
    date: "Week 6",
    description:
      "Learn effective strategies for applying to internships in software, data, and finance industries in the USA. Discover tips and tricks to maximize your chances of getting interview calls.",
    tag: "Applying",
  },
  {
    title: "Leetcode",
    date: "Week 7 + 8",
    description:
      "Get detailed guidance on how to use Leetcode effectively to practice technical questions. Participate in weekly group Leetcode sessions with live coding reviews.",
    tag: "Practice",
  },
  {
    title: "Online Assessments",
    date: "Week 9",
    description:
      "Gain access to specialized resources to prepare for online assessments tailored to each company's requirements for the best possible outcomes.",
    tag: "Assessment",
  },
  {
    title: "Behavioral Interview",
    date: "Week 10",
    description:
      "Prepare personalized answers using the STAR method for each application. Learn about the characteristics of individual companies and conduct mock interviews with a mentor as needed.",
    tag: "Interview",
  },
  {
    title: "Technical Interview",
    date: "Week 11",
    description:
      "Thorough preparation for various types of technical questions, including Leetcode, object-oriented programming, and system design. Conduct mock interviews with mentors as required.",
    tag: "Interview",
  },
  {
    title: "Networking",
    date: "Week 12",
    description:
      "Learn how to communicate effectively with companies at conferences, request referrals, write impactful cold emails, and join a network of experienced mentors and peers.",
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
              <br />
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
