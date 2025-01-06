import React from "react";
import { Collapse, Typography } from "antd";
import "./FAQ.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const FAQ = () => {
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
        "When looking for mentors in the market, they encountered mentoring packages costing $100–200 per hour, or $1,000–2,000 for full support packages. Some even required commitments of 10–15% of the mentee’s first-year salary, but none of these packages truly understood their needs.",
        "During that time, they only hoped for a companion who could guide them through effective company search and application processes, share tips and tricks to increase interview chances, focus on relevant technical preparation, build quality networks, and provide tailored resources.",
        "The hardest part was finding someone who had gone through similar struggles and could offer practical, empathetic advice based on current recruitment market trends. Someone who also understood feelings like 'imposter syndrome,' self-doubt, or moments of discouragement.",
        '"That’s when we needed a friend who could make us feel reassured and confident"—a skilled person in technology, especially software, who had deep, broad, and efficient knowledge yet could provide support in a cost-effective way.',
        "And so, Pathwise Mentorship was born in December 2023.",
      ],
    },
  ];

  return (
    <div className="faq-container">
      <Title level={2} className="faq-title">
        Frequently Asked Questions
      </Title>
      <Collapse accordion className="faq-collapse">
        {faqData.map((item, index) => (
          <Panel header={item.question} key={index} className="faq-panel">
            {item.answer.map((text, idx) => (
              <Text key={idx} className="faq-answer">
                {text}
              </Text>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQ;
