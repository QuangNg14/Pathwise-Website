import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusOutlined,
  LinkedinOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./MentorCarousel.css";

const MentorCarousel = ({ mentors }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const router = useRouter();

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleViewTeamClick = () => {
    router.push("/about");
  };

  // Enhanced mentor data with bio information
  const mentorBioData = {
    "Quang Nguyen": {
      bio: [
        "Quang Nguyen is currently a Software Engineer at Microsoft. He previously interned as a software engineer at NVIDIA (Summer 2023) and Facebook (Summer 2022).",
        "He received a full-ride scholarship worth $73,000/year for 4 years at Rice University, majoring in Computer Science.",
        "As the President of Rice Apps (Rice Software Engineering Club) at Rice University, he has mentored and taught over 60 members about professional web and mobile application development.",
        "Quang has been our head mentor since day 1 and has led and guided over 60 mentees to successful internship applications at top companies.",
      ],
      role: "Head Mentor",
    },
    "Tri Bui": {
      bio: [
        "Tri Bui currently works in Risk Management at Revantage, a Blackstone portfolio company, and has interned as a Software Engineer at Daikin, DetectAuto, and Deloitte Vietnam.",
        "Founder/CEO of Esmart Solutions, a company providing communication and technology solutions to small and medium-sized businesses in Vietnam.",
        "President of the Entrepreneurship and Investment Clubs at Macalester College. He has won multiple awards in technology, finance, and entrepreneurship, with a total value exceeding $15,000.",
      ],
      role: "Mentor",
    },
    "Anh Ngo": {
      bio: [
        "Anh Ngo is currently an Investment Banking Analyst at Deutsche Bank.",
        "She received a scholarship to study Economics at the University of Pennsylvania (UPenn).",
        "Vice President of the Wharton Finance Club and a member of the International Student Advisory Board at UPenn.",
        "She has extensive experience working at UPenn Career Services, where she has assisted over 200 students with resume reviews and career guidance.",
      ],
      role: "Advisor",
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
        <div className="mentor-section-header">
          <h2 className="mentor-section-title">Meet your mentors</h2>
          <button
            className="view-team-button"
            onClick={handleViewTeamClick}
            type="button"
          >
            <TeamOutlined className="view-team-icon" />
            View our team
          </button>
        </div>

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
