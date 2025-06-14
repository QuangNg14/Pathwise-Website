import React, { useState, useEffect } from "react";
import "./Timeline.css";

const timelineData = [
  {
    title: "Profile Optimization & Personal Branding",
    date: "Weeks 1-2",
    shortDescription:
      "Build a professional foundation with optimized resumes, LinkedIn profiles, and personal portfolios.",
    fullDescription:
      "Master the art of professional profile creation with comprehensive guidance on Resume/CV crafting tailored to each company and position. Learn to leverage AI tools that optimize content to bypass Applicant Tracking Systems (ATS). Build an impressive personal portfolio showcasing practical skills and problem-solving abilities. Complete and optimize crucial online profiles like LinkedIn and GitHub to make a strong impression on recruiters.",
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
      "Comprehensive technical training covering Software Engineering (Data Structures & Algorithms, System Design), Data Science (SQL mastery, Python/Pandas, Machine Learning), and Finance (Financial Modeling, Excel proficiency, Market Analysis). Participate in practical workshops and real-world case studies.",
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
      "Master effective strategies for applying to internships and full-time jobs in Software, Data, and Finance industries in the USA. Discover tips and tricks to maximize your chances of getting interview calls, including application tailoring and ATS optimization. Gain access to specialized resources for online assessments (OAs) tailored to each company's requirements.",
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
      "Get detailed guidance on effective LeetCode practice with weekly group sessions featuring live coding reviews. Master various technical question types including algorithms, data structures, system design, and low-level design. Participate in mock technical interviews with experienced mentors.",
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
      "Learn to tell your compelling personal story showcasing experiences relevant to target positions. Master the STAR method for situational questions and gain deep understanding of company cultures. Practice mock behavioral interviews to build confidence and receive actionable feedback.",
    details: [
      "Personal storytelling and background narrative",
      "STAR method mastery for situational questions",
      "Company culture analysis and 'Why' questions",
      "Mock behavioral interviews with mentor feedback",
      "Industry-specific behavioral question preparation",
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
      "Master the art of effective networking including professional communication at conferences and recruitment events. Learn to write impactful cold emails and effectively request referrals. Develop strategies to navigate competitive job markets and join a strong community of mentors and peers.",
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
      "Get comprehensive personalized support including 100% resume/CV reviews, essay assistance for new graduates, and diverse mock interview rounds (Behavioral, Technical, Final Round). Receive specific, actionable feedback to improve your interview skills and application materials.",
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
      "Gain full access to job application platforms, fellowship programs, internships, and hackathons. Work on impactful projects including backend infrastructures, full-stack applications with AI integrations, and RAG projects to enhance your portfolio.",
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
      "Attend workshops and sharing sessions with experienced mentors from top companies. Hear success stories and get detailed insights into interview processes and tips for major companies, helping you prepare effectively for all interview stages.",
    details: [
      "Success story sharing sessions with industry professionals",
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
      <h2 className="timeline-title">Mentorship Program Journey</h2>
      <div className="timeline-subtitle">
        A comprehensive 12-week program designed to launch your career in
        Software, Data, and Finance
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
                        <span className="detail-bullet">•</span>
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
                  {expandedCards.has(index) ? "Show Less" : "Learn More"}
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
