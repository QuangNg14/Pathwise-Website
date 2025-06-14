import React, { useState } from "react";
import { PlusOutlined, LinkedinOutlined } from "@ant-design/icons";
import "./MentorCarousel.css";

const MentorCarousel = ({ mentors }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Enhanced mentor data with bio information
  const mentorBioData = {
    "Quang Nguyen": {
      bio: [
        "Quang Nguyen is currently a Software Engineer at Microsoft. He previously interned as a software engineer at NVIDIA (Summer 2023) and Facebook (Summer 2022).",
        "He received a full-ride scholarship worth $73,000/year for 4 years at Rice University, majoring in Computer Science.",
        "As the President of Rice Apps (Rice Software Engineering Club) at Rice University, he has mentored and taught over 60 members about professional web and mobile application development.",
      ],
      role: "Head Mentor",
    },
    "Anh Ngo": {
      bio: [
        "Anh Ngo is currently an Investment Banking Analyst at Deutsche Bank, working on high-profile M&A transactions and capital markets deals.",
        "He previously worked as a consultant at BCG (Boston Consulting Group) where he advised Fortune 500 companies on strategic initiatives.",
        "Anh graduated summa cum laude from his university with a degree in Finance and Economics, and has extensive experience in financial modeling and valuation.",
      ],
      role: "Advisor",
    },
    "Tri Bui": {
      bio: [
        "Tri Bui is a successful entrepreneur and software engineer who has founded multiple startups in the tech industry.",
        "He has over 8 years of experience in software development, specializing in full-stack web development and mobile applications.",
        "Tri has mentored numerous aspiring entrepreneurs and developers, helping them build and scale their technical products from ideation to market launch.",
      ],
      role: "Mentor",
    },
    "Lam Nguyen": {
      bio: [
        "Lam Nguyen is a Software Engineer at Microsoft, working on cloud infrastructure and distributed systems.",
        "He has extensive experience in backend development, system design, and has contributed to several open-source projects.",
        "Lam is passionate about mentoring junior developers and sharing knowledge about software engineering best practices and career development.",
      ],
      role: "Mentor",
    },
    "Jonathan Cheng": {
      bio: [
        "Jonathan Cheng is an Associate Consultant at Bain & Company, specializing in strategy consulting for technology and healthcare clients.",
        "He has led multiple client engagements focused on digital transformation, operational efficiency, and market entry strategies.",
        "Jonathan holds an MBA and has a strong background in business analytics and strategic planning.",
      ],
      role: "Mentor",
    },
  };

  return (
    <div className="mentor-section-container">
      <div className="mentor-section-content">
        <h2 className="mentor-section-title">Meet your mentors</h2>

        <div className="mentor-cards-container">
          {mentors.map((mentor, index) => {
            const isExpanded = expandedCard === index;
            const bioData = mentorBioData[mentor.name] || {
              bio: ["Bio coming soon..."],
              role: "Mentor",
            };

            return (
              <div
                key={index}
                className={`mentor-card-item ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  className={`mentor-card-header ${
                    isExpanded ? "expanded" : ""
                  }`}
                  onClick={() => toggleCard(index)}
                >
                  <div className="mentor-header-left">
                    <PlusOutlined className="expand-icon" />
                    <div className="mentor-header-text">
                      <h3 className="mentor-name">{mentor.name}</h3>
                      <p className="mentor-title">{mentor.company}</p>
                    </div>
                  </div>

                  <div className="mentor-header-right">
                    <div className="company-logos">
                      {mentor.companyLogos.map((logo, logoIndex) => (
                        <img
                          key={logoIndex}
                          src={logo}
                          alt={`Company ${logoIndex + 1}`}
                          className="company-logo"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`mentor-card-content ${
                    isExpanded ? "expanded" : ""
                  }`}
                >
                  <div className="mentor-content-inner">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="mentor-image"
                    />

                    <div className="mentor-bio">
                      {bioData.bio.map((paragraph, paragraphIndex) => (
                        <div
                          key={paragraphIndex}
                          className="mentor-bio-section"
                        >
                          {paragraph}
                        </div>
                      ))}
                    </div>

                    <div className="mentor-actions">
                      <p className="mentor-role-text">{bioData.role}</p>
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-text"
                      >
                        Go to LinkedIn ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorCarousel;
