import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { navigateToApplication } from "@/utils/navigation";
import "./ServiceCards.css";

const services = [
  {
    title: "Software Engineering Track (Pathwise Mentorship 2026)",
    description:
      "A structured, deep technical track for Software Engineering — designed from recent Big Tech OA/interview patterns (Fall 2025) and focused on job-ready capability (not short-term trends).",
    details: [
      "LeetCode roadmap built around core topics + patterns that show up most in recent OA & interviews",
      "Core focus: (1) algorithm analysis + pattern recognition, (2) choosing the right approach, (3) implementing + explaining solutions clearly",
      "Interview rehearsal: consistent mock interviews + feedback to build strong communication under pressure",
      "Profile & strategy support: resume/LinkedIn positioning + weekly plan to stay disciplined and consistent",
    ],
    start: "Applications open: 27/12",
    duration: "Cohort-based (2026)",
    people: "Selective intake",
    fee: "Contact us",
  },
  {
    title: "Data Track (Analytics/Engineering + optional Data Science)",
    description:
      "A practical, business-aligned data track focusing on SQL core, plus Python & Power BI — tailored for Data Analyst, Data Engineer (entry-level), and Data/Finance-related roles.",
    details: [
      "Clear roadmap by starting level (foundation → intermediate → interview-ready) with a realistic timeline",
      "Role matching: guidance on which roles fit your current profile (DA / DE / Data–Finance) and how to close gaps",
      "End-to-end Data Project support: build a complete project you can put on your CV and discuss in interviews",
      "Decision-making with data: learn how data is actually used in business, not just tools and dashboards",
      "Curated U.S. fellowships + data programs (selected and integrated into the path) for Apply 2027 goals",
    ],
    start: "Applications open: 27/12",
    duration: "Cohort-based (2026)",
    people: "Selective intake",
    fee: "Contact us",
  },
  {
    title: "US Admissions & Graduate Prep",
    description:
      "Comprehensive support for students applying to Master’s and PhD programs in the US — with a structured strategy that complements Tech/Finance recruiting.",
    details: [
      "Program strategy: shortlist building (fit, outcomes, ROI), timeline, and application checkpoints",
      "Profile building: research/projects plan + recommendation strategy + narrative positioning",
      "Essays & materials: SOP/personal statement guidance, experience framing, and revision cycles",
      "Admissions coaching: interview preparation, fellowship suggestions, and long-term academic goals",
    ],
    start: "Seasonal cycle",
    duration: "6-12 months",
    people: "Small cohort",
    fee: "Contact us",
  },
  {
    title: "Selective Intake — High-Signal Talent Community",
    description:
      "Pathwise applies mandatory intake interviews for all applicants to maintain a high-quality, focused learning cohort.",
    details: [
      "Interview required for all applicants (skills + commitment + learning readiness)",
      "Ensures a high standard of cohort quality and a productive learning environment",
      "Keeps the community small, focused, and high-signal — where people can rely on each other",
      "Built for those ready to learn deep, build discipline, and grow long-term with clear standards",
    ],
    start: "Applications open: 27/12/2025",
    duration: "Rolling interviews",
    people: "Limited seats",
    fee: "Free to apply",
  },
  {
    title: "Workshops, Fireside Chats & Rehearsals",
    description:
      "Regular sessions with mentors and industry guests across Tech, Finance, US Admissions, and AI — focused on real interview signal, career strategy, and high-quality Q&A.",
    details: [
      "Hiring-manager style rehearsals: turn interviews into friendly, productive conversations",
      "Technical + behavioral signal training: how to show qualities, collaboration, and judgment",
      "Career strategy updates: what’s changing in recruiting and how to respond",
      "Open Q&A + community practice: learn faster through high-quality peer + mentor feedback",
    ],
    start: "Rolling",
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
    navigateToApplication(router);
  };

  return (
    <div className="services-section">
      <div className="services-hero">
        <div className="services-eyebrow">
          <span className="services-badge">Applications open</span>
          <span className="services-date">27/12</span>
        </div>

        <h2 className="services-title">
          Pathwise Mentorship <span className="services-title-year">2026</span>
        </h2>

        <p className="services-subtitle">Restructure • Rebuild • Rehearsal</p>

        {/* <p className="services-intro">
          Rebuilt after 2 years and 100+ mentees - deeper core technical
          training, selective intake, and a high-signal community.
        </p> */}

        {/* <p className="services-intro services-intro-vi">
          Tái cấu trúc toàn diện: học sâu kỹ năng cốt lõi, tuyển chọn đầu vào,
          xây cộng đồng học tập chất lượng cao.
        </p> */}
      </div>

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
