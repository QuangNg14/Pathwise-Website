import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./ServiceCards.css";

const services = [
  {
    title: "Internships & Research for Freshman & Sophomore",
    description:
      "Comprehensive program helping underclassmen secure internships and research opportunities in Software Engineering and Data Science through profile optimization, technical projects, and interview preparation.",
    details: [
      "Profile Analysis & Personal Branding - Resume, LinkedIn, GitHub optimization",
      "8 Interactive Technical Sessions - Skills training and career orientation",
      "Group Technology Projects - Full-stack development in Software Engineering or Data",
      "Access to Elite Programs - Google STEP, Microsoft Explore, and research opportunities",
    ],
    start: "July 2025",
    duration: "6 months",
    people: "5 - 10 mentees",
    fee: "Contact us",
  },
  {
    title: "Internships & Full-time for Juniors & Seniors",
    description:
      "Advanced program for upperclassmen focusing on technical interview mastery, behavioral preparation, and strategic job search for Software Engineering and Data roles.",
    details: [
      "Complete Study Materials - Session recordings, slides, and development courses",
      "Internship Search Support - 6-8 weekly updates on opportunities and programs",
      "LeetCode Mastery - Data structures, algorithms, and system design preparation",
      "Interview Excellence - Technical, behavioral, and company-specific strategies",
      "Community Network - Connect with peers through forums and group practice",
    ],
    start: "July 2025",
    duration: "6 months",
    people: "10 - 15 mentees",
    fee: "Contact us",
  },
  {
    title: "Investment Banking & Finance",
    description:
      "Specialized program for Finance and Investment Banking career preparation, covering industry fundamentals, networking strategies, and technical finance concepts.",
    details: [
      "Industry Deep Dive - Finance and Investment Banking landscape",
      "Profile Building - Tailored resume and application strategies",
      "Strategic Networking - Effective relationship building in Finance",
      "Core Finance Topics - Capital budgeting, financial analysis, and corporate finance",
      "Role Preparation - Corporate Finance, FP&A, Treasury, and Accounting focus",
    ],
    start: "September 2025",
    duration: "2 months",
    people: "~5 mentees",
    fee: "Contact us",
  },
  {
    title: "Professional Workshops & Fireside Chats",
    description:
      "Regular networking sessions with industry professionals sharing insights, career tips, and success strategies across Software, Data, AI, and Finance sectors.",
    details: [
      "Success Stories - Learn from recent internship and job placement winners",
      "Industry Insights - Current trends in Software, Data, ML, AI, and Finance",
      "Application Strategies - Critical tips for upcoming recruitment cycles",
      "Q&A Sessions - Direct access to industry professionals",
    ],
    start: "June 2025",
    duration: "Bi-weekly sessions",
    people: "Unlimited",
    fee: "Free",
  },
];

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="service-card">
      <div className="service-header">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
      </div>
      <div className="service-info">
        <div className="info-item">
          <CalendarOutlined className="icon" />
          <span className="info-text">{service.start}</span>
        </div>
        <div className="info-item">
          <ClockCircleOutlined className="icon" />
          <span className="info-text">{service.duration}</span>
        </div>
        <div className="info-item">
          <UsergroupAddOutlined className="icon" />
          <span className="info-text">{service.people}</span>
        </div>
        <div className="info-item">
          <DollarOutlined className="icon" />
          <span className="info-text">{service.fee}</span>
        </div>
      </div>
      <button className="expand-button" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide Details" : "View Details"}
      </button>
      {expanded && (
        <ul className="service-details">
          {service.details.map((detail, index) => (
            <li key={index} className="detail-item">
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ServicesSection = () => {
  const router = useRouter();

  const handleApplyClick = (e) => {
    e.preventDefault();
    router.push("/#application");
  };

  return (
    <div className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
      <div className="global-action-buttons">
        <a
          className="custom-action-button"
          href="https://www.facebook.com/pathwise.mentorship"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
        <button
          className="custom-action-button primary"
          onClick={handleApplyClick}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
