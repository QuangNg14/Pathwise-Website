import React, { useState, useEffect } from "react";
import "./Timeline.css";

const timelineData = [
  {
    title: "Profile Optimization & Personal Branding",
    date: "Weeks 1-2",
    shortDescription:
      "Build a professional foundation with optimized resumes, LinkedIn profiles, and personal portfolios.",
    fullDescription:
      "Master professional profile creation with comprehensive guidance on Resume/CV crafting tailored to each company. Learn AI tools for ATS optimization and build impressive portfolios showcasing practical skills.",
    details: [
      "Professional Resume/CV creation with ATS optimization",
      "Personal branding and portfolio development",
      "LinkedIn profile enhancement and networking setup",
      "GitHub optimization for technical profiles",
      "AI tools integration for profile optimization",
    ],
    tag: "Foundation",
    icon: "👤",
  },
  {
    title: "Technical Skills Development",
    date: "Weeks 3-6",
    shortDescription:
      "Deep dive into technical skills for Software, Data, and Finance industries with hands-on workshops.",
    fullDescription:
      "Comprehensive technical training covering Software Engineering, Data Science, and Finance with practical workshops and real-world case studies.",
    details: [
      "Software: DSA, System Design, OOP Design patterns",
      "Data: SQL mastery, Python/Pandas, ML algorithms",
      "Finance: Financial modeling, Excel advanced functions",
      "20+ in-depth technical lessons and workshops",
      "Real-world case studies and practical applications",
    ],
    tag: "Technical",
    icon: "💻",
  },
  {
    title: "Application Strategy & Market Navigation",
    date: "Weeks 4-8",
    shortDescription:
      "Learn effective strategies for applying to top companies and maximizing interview opportunities.",
    fullDescription:
      "Master effective strategies for applying to internships and full-time jobs. Discover tips to maximize interview calls and gain access to specialized OA resources.",
    details: [
      "Industry-specific application strategies (Software, Data, Finance)",
      "ATS optimization and application tailoring techniques",
      "Online Assessment (OA) preparation resources",
      "Company research and culture analysis",
      "Application tracking and follow-up strategies",
    ],
    tag: "Strategy",
    icon: "🎯",
  },
  {
    title: "LeetCode & Technical Interview Mastery",
    date: "Weeks 5-10",
    shortDescription:
      "Intensive technical interview preparation with weekly LeetCode sessions and live coding reviews.",
    fullDescription:
      "Get detailed guidance on effective LeetCode practice with weekly group sessions. Master technical question types and participate in mock interviews.",
    details: [
      "Weekly group LeetCode sessions with live reviews",
      "Coverage of 20+ key data structures and algorithms",
      "System Design and Low-Level Design workshops",
      "Mock technical interviews with detailed feedback",
      "Problem-solving techniques and optimization strategies",
    ],
    tag: "Technical Practice",
    icon: "⚡",
  },
  {
    title: "Behavioral Interview Excellence",
    date: "Weeks 6-9",
    shortDescription:
      "Master behavioral interviews with STAR method, storytelling, and company-specific preparation.",
    fullDescription:
      "Learn to tell your compelling personal story and master the STAR method. Practice mock behavioral interviews with actionable feedback.",
    details: [
      "Personal storytelling and background narrative",
      "STAR method mastery for situational questions",
      "Company culture analysis and 'Why' questions",
      "Mock behavioral interviews with mentor feedback",
      "Industry-specific behavioral preparation",
    ],
    tag: "Behavioral",
    icon: "🗣️",
  },
  {
    title: "Networking & Professional Relationships",
    date: "Weeks 8-12",
    shortDescription:
      "Build professional networks through strategic networking, referrals, and community engagement.",
    fullDescription:
      "Master effective networking including professional communication at events. Learn to write impactful cold emails and request referrals effectively.",
    details: [
      "Professional networking at conferences and events",
      "Strategic referral request techniques",
      "Cold email writing and outreach strategies",
      "Competitive market navigation strategies",
      "Community building and peer support networks",
    ],
    tag: "Networking",
    icon: "🤝",
  },
  {
    title: "Personalized 1-on-1 Support",
    date: "Throughout Program",
    shortDescription:
      "Receive tailored mentorship with resume reviews, mock interviews, and personalized guidance.",
    fullDescription:
      "Get comprehensive personalized support including resume reviews, essay assistance, and diverse mock interview rounds with specific feedback.",
    details: [
      "100% Resume/CV review and optimization",
      "Essay reviews and 'Why' question assistance",
      "Multiple mock interview rounds with feedback",
      "Personalized career guidance and strategy",
      "One-on-one mentorship sessions",
    ],
    tag: "Support",
    icon: "🎓",
  },
  {
    title: "Resource Hub & Project Development",
    date: "Throughout Program",
    shortDescription:
      "Access comprehensive resources and develop impactful projects for your portfolio.",
    fullDescription:
      "Gain access to job platforms, fellowships, and hackathons. Work on impactful projects including backend infrastructures and AI integrations.",
    details: [
      "Job application platforms and fellowship programs",
      "Internship and hackathon opportunities",
      "Backend infrastructure and system design projects",
      "Full-stack applications with AI integrations",
      "RAG projects and AI agent development",
    ],
    tag: "Resources",
    icon: "📚",
  },
  {
    title: "Success Stories & Industry Insights",
    date: "Throughout Program",
    shortDescription:
      "Learn from successful mentors and gain insights into top company interview processes.",
    fullDescription:
      "Attend workshops with experienced mentors from top companies. Hear success stories and get detailed insights into interview processes.",
    details: [
      "Success story sharing with industry professionals",
      "Interview process insights from top companies",
      "Tips and advice from experienced mentors",
      "Industry trends and market analysis",
      "Career progression strategies and guidance",
    ],
    tag: "Insights",
    icon: "✨",
  },
];

const Timeline = () => {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = (index) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="timeline-section">
      <h2 className="timeline-title">
        PATHWISE MENTORSHIP 2026: RESTRUCTURE - REBUILD - REHEARSAL
      </h2>
      <div className="timeline-subtitle">
        A comprehensive curriculum restructure based on 2+ years and 100+ mentees.
        Pathwise Mentorship 2026 focuses on deep core technical skills, selective
        intake, and a high-signal learning community for Tech (Software, Data),
        Finance, and US Admissions.
      </div>
      <div className="timeline-container">
        {timelineData.map((event, index) => (
          <div
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${
              visibleCards.has(index) ? "visible" : ""
            }`}
            key={index}
            data-index={index}
          >
            <div className="content">
              <div className="event-header">
                <span className="event-icon">{event.icon}</span>
                <div className="event-meta">
                  <span className="event-date">{event.date}</span>
                  <span
                    className={`event-tag ${event.tag
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {event.tag}
                  </span>
                </div>
              </div>

              <h4 className="event-title">{event.title}</h4>

              <p className="event-description">
                {expandedCards.has(index)
                  ? event.fullDescription
                  : event.shortDescription}
              </p>

              {expandedCards.has(index) && (
                <div className="event-details">
                  <h5 className="details-title">Key Components:</h5>
                  <ul className="details-list">
                    {event.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="detail-item">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="expand-button"
                onClick={() => toggleExpanded(index)}
                aria-label={
                  expandedCards.has(index) ? "Show less" : "Show more"
                }
              >
                <span className="expand-text">
                  {expandedCards.has(index) ? "Show Less" : "Skills Gained"}
                </span>
                <span
                  className={`expand-icon ${
                    expandedCards.has(index) ? "expanded" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
            </div>
          </div>
        ))}

        {/* Animated timeline line */}
        <div className="timeline-line">
          <div className="timeline-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
