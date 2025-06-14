import React, { useState, useEffect } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./FAQ.css";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [animatingIndex, setAnimatingIndex] = useState(null);

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      // Closing
      setExpandedIndex(null);
      setAnimatingIndex(null);
    } else {
      // Opening
      setExpandedIndex(index);
      // Small delay to ensure smooth animation
      setTimeout(() => {
        setAnimatingIndex(index);
      }, 50);
    }
  };

  const faqData = [
    {
      question: "What is Pathwise?",
      answer: [
        "Pathwise is a peer-to-peer mentorship program designed for university students in Vietnam, the USA, Australia, Canada, and Singapore to help them find internship opportunities at corporations, businesses, research labs, and secure full-time jobs upon graduation. With experienced mentors, we assist mentees with resumes, profiles, projects, interviews, and expanding connections within professional communities.",
      ],
    },
    {
      question: "Why should you join Pathwise as a mentee?",
      answer: [
        "Effective - Focused on specific and concise knowledge to optimize the application process for major corporations.",
        "Affordable - Costs are optimized to be student-friendly and save 60-70% compared to market prices.",
        "Personalized - Each mentee receives 1-on-1 care with private channels and personalized sessions. The number of mentees is limited to ensure maximum quality.",
      ],
    },
    {
      question: "Who can join the Pathwise program?",
      answer: [
        "All university students in Vietnam, the USA, Australia, Canada, and Singapore who are seeking internships or full-time opportunities in research labs or corporations can join. Each program cycle accepts a limited number of mentees, so register as soon as possible!",
      ],
    },
    {
      question: "What is the origin story of Pathwise?",
      answer: [
        "Pathwise started from the competitive and challenging process of applying for internships in the USA. Sending out 300–400 applications and continuously applying without receiving any interviews—or receiving just 1–3 interviews with low success rates—became a familiar story.",
        "At the time, without mentor support, the Pathwise team had to figure things out on their own, searching for answers everywhere. However, the knowledge and materials they found were often vague and ineffective, wasting time and causing confusion.",
        "When looking for mentors in the market, they encountered mentoring packages costing $100–200 per hour, or $1,000–2,000 for full support packages. Some even required commitments of 10–15% of the mentees first-year salary, but none of these packages truly understood their needs.",
        "During that time, they only hoped for a companion who could guide them through effective company search and application processes, share tips and tricks to increase interview chances, focus on relevant technical preparation, build quality networks, and provide tailored resources.",
        "The hardest part was finding someone who had gone through similar struggles and could offer practical, empathetic advice based on current recruitment market trends. Someone who also understood feelings like imposter syndrome, self-doubt, or moments of discouragement.",
        "Thats when we needed a friend who could make us feel reassured and confident — a skilled person in technology, especially software, who had deep, broad, and efficient knowledge yet could provide support in a cost-effective way.",
        "And so, Pathwise Mentorship was born in December 2023.",
      ],
    },
  ];

  return (
    <div className="faq-container">
      <div className="faq-content-wrapper">
        <div className="faq-title-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-cards-stack">
          {faqData.map((item, idx) => {
            const expanded = expandedIndex === idx;
            const animating = animatingIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-card ${expanded ? "expanded" : "collapsed"}`}
              >
                <div
                  className={`faq-card-header ${expanded ? "expanded" : ""}`}
                  onClick={() => handleToggle(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggle(idx);
                    }
                  }}
                >
                  <span className="faq-icon">
                    {expanded ? <CloseOutlined /> : <PlusOutlined />}
                  </span>
                  <span className="faq-question">{item.question}</span>
                </div>
                <div className={`faq-card-content ${expanded ? "expanded" : ""}`}>
                  <hr className="faq-divider" />
                  {item.answer.map((text, i) => (
                    <div className="faq-answer" key={i}>{text}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
