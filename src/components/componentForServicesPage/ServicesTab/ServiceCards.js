import React, { useState } from "react";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./ServiceCards.css";

const services = 
[
  {
    "title": "Internships/Research finding for Freshman & Sophomore",
    "description": "Our program helps freshmen and sophomores find internships and research opportunities in Software Engineering and Data. Participants will be thoroughly guided on how to prepare effective resumes, work on impactful technical projects for the community, practice interviews, and carefully refine essays for applications. We also help students get into research, data programs, and special training programs, including first and second-year programs from big tech companies such as Google STEP, Microsoft Explore, and more.",
    "details": [
      "Analyze existing profiles (Resume, LinkedIn, GitHub, etc.) to identify strengths and weaknesses. Build compelling personal stories that highlight relevant skills, experience, and achievements.",
      "Attend 8 interactive sessions covering necessary skills and knowledge related to the field. Sessions may include technical training, interview preparation, and career orientation.",
      "Work in groups to complete a full technology project in the fields of Software Engineering or Data. Students will also get access to personal technical projects on topics that are common and important in big tech such as backend infrastructure, AI Agent, and machine learning projects.",
      "Gain access to resources and guidance for research, data programs, and special training programs, including first and second-year programs from big tech companies like Google STEP and Microsoft Explore."
    ],
    "start": "July 2025",
    "duration": "6 months",
    "people": "5 - 10 mentees",
    "fee": "Cost - Contact us"
  },
  {
    "title": "Internships/Full-time jobs finding for Juniors & Seniors",
    "description": "Our program assists juniors and seniors in finding internships and new grad opportunities in Software Engineering and Data. Participants will practice behavioral and technical interviews thoroughly, be grouped to practice LeetCode together, and receive continuous updates on internships, special programs, and resources tailored for specific companies.",
    "details": [
      "Access all study and development materials, including session slides, recordings, reports, skill development courses, and interview practice resources.",
      "Internship Search Support: Continuously updated internship opportunities, special programs, and related updates through personal notifications, industry updates, and access to exclusive internship boards (6-8 times/week).",
      "Community Sharing & Support: Connect with other internship seekers via online forums and group chats to share experiences, learn from each other, and stay motivated.",
      "Curated series of LeetCode technical topics and other important interview topics. These include but are not limited to:",
      "  - Time and space complexity (Big O notation)",
      "  - Data Structures: Arrays, Strings, Linked Lists, Stacks, Queues, Hash Tables, Trees (Binary, BST, AVL, Red-Black), Graphs (BFS, DFS, shortest path, MST), Heaps, Disjoint Sets.",
      "  - Algorithms: Sorting (Quick, Merge, Heap), Search (Binary, Ternary), Dynamic Programming (Knapsack, LCS), Greedy, Divide and Conquer, Backtracking, Bit Manipulation, String Algorithms (KMP, Rabin-Karp), Mathematical Algorithms (GCD/LCM, modular arithmetic).",
      "  - Design Questions: System design, low-level design, OOP design.",
      "  - Onsite interviews and company-specific interview strategies.",
      "  - Networking strategies."
    ],
    "start": "July 2025",
    "duration": "6 months",
    "people": "10 - 15 mentees",
    "fee": "Cost - Contact us"
  },
  {
    "title": "Investment Banking & Finance (Coming Soon)",
    "description": "This program is planned for the near future. It will help participants search for jobs and apply to positions in Finance and Investment Banking.",
    "details": [
      "Learn about the Finance and Investment Banking industry.",
      "Receive guidance on how to build a profile for applying to this field.",
      "Learn effective networking strategies in Finance to secure interviews.",
      "Cover key finance topics such as Time Value of Money & Capital Budgeting, Cost of Capital, Risk & Return, Financial-Statement Analysis & Short-Term Forecasting, and Capital Structure & Long-term planning, relevant for roles in Corporate Finance, FP&A, Financial Analysis, Treasury, Corporate Development, and Accounting."
    ],
    "start": "September 2025",
    "duration": "2 months",
    "people": "~5 mentees",
    "fee": "Cost - Contact us"
  },
  {
    "title": "Frequent Workshops and Fireside Chat with Professionals",
    "description": "We regularly organize informal chats and sharing sessions with professionals in Software, Data, Machine Learning, AI, Finance, and Investment Banking.",
    "details": [
      "Talk with individuals who have successfully secured internships and new grad jobs during recent challenging times.",
      "Hear about their current roles in trending fields like Software, Data, and Investment Banking.",
      "Share critical tips/tricks to increase the chances of successful applications for upcoming cycles."
    ],
    "start": "June 2025",
    "duration": "1 session every 2 weeks",
    "people": "Unlimited",
    "fee": "Free"
  }
]

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
      <button
        className="expand-button"
        onClick={() => setExpanded(!expanded)}
      >
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
          href="https://www.facebook.com/pathwise.techmentorship"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
        <a
          className="custom-action-button primary"
          href="https://docs.google.com/forms/d/e/1FAIpQLSf44FrJ2powtp9MMvGfHcz8F7irZLyfjxaCkIpr-HAr0Fl4oQ/viewform?pli=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

export default ServicesSection;
