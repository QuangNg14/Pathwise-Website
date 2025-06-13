import React from "react";
import { Typography } from "antd";
import "./CompanyInterviews.css";

const { Title } = Typography;

const interviewProcesses = [
  {
    company: "Meta",
    position: "Software Engineer Intern",
    steps: [
      {
        title: "Resume Screening",
        description: "Initial application review and university recruiting"
      },
      {
        title: "Online Assessment",
        description: "Coding challenges and behavioral questions"
      },
      {
        title: "Phone Screen",
        description: "Technical interview with coding problems"
      },
      {
        title: "Virtual Onsite",
        description: "2-3 technical rounds + behavioral interview"
      },
      {
        title: "Final Decision",
        description: "Team matching and offer negotiation"
      }
    ]
  },
  {
    company: "Google",
    position: "STEP Intern",
    steps: [
      {
        title: "Application Review",
        description: "Academic performance and diversity criteria"
      },
      {
        title: "Technical Phone Screen",
        description: "1-2 coding interviews with Googlers"
      },
      {
        title: "Host Matching",
        description: "Matched with potential team and mentor"
      },
      {
        title: "Final Interview",
        description: "Meet with team lead and discuss project"
      }
    ]
  },
  {
    company: "Microsoft",
    position: "Software Engineer Intern",
    steps: [
      {
        title: "Application Submit",
        description: "Online application through university programs"
      },
      {
        title: "Coding Assessment",
        description: "Online coding test and problem solving"
      },
      {
        title: "Virtual Interviews",
        description: "Technical and behavioral interview rounds"
      },
      {
        title: "Team Placement",
        description: "Assignment to specific team and project"
      }
    ]
  },
  {
    company: "Amazon",
    position: "SDE Intern",
    steps: [
      {
        title: "Online Application",
        description: "Resume submission and initial screening"
      },
      {
        title: "Online Assessment",
        description: "Coding challenges and work style assessment"
      },
      {
        title: "Virtual Interview",
        description: "Technical coding interview with engineer"
      },
      {
        title: "Final Round",
        description: "Behavioral interview focusing on leadership principles"
      }
    ]
  },
  {
    company: "Palantir",
    position: "Forward Deployed Engineer",
    steps: [
      {
        title: "Application Review",
        description: "Resume and project portfolio evaluation"
      },
      {
        title: "HackerRank Challenge",
        description: "Take-home coding assessment"
      },
      {
        title: "Technical Phone Screen",
        description: "Live coding and system design discussion"
      },
      {
        title: "Onsite Interviews",
        description: "Multiple rounds covering technical and problem-solving"
      },
      {
        title: "Decomp & Decision",
        description: "Team discussion and final hiring decision"
      }
    ]
  },
  {
    company: "Goldman Sachs",
    position: "Technology Analyst",
    steps: [
      {
        title: "Application Screening",
        description: "Academic background and experience review"
      },
      {
        title: "Video Interview",
        description: "Behavioral questions and motivation assessment"
      },
      {
        title: "Superday",
        description: "Multiple interviews including technical and fit"
      },
      {
        title: "Final Decision",
        description: "Division placement and offer details"
      }
    ]
  }
];

const interviewStats = [
  { number: "25+", label: "Top-Tier Companies" },
  { number: "150+", label: "Interview Rounds" },
  { number: "85%", label: "Success Rate" },
  { number: "40+", label: "Offers Received" }
];

const CompanyInterviews = () => {
  return (
    <div className="company-interviews-section">
      <div className="company-interviews-content">
        <Title level={2} className="section-title">
          Interview Process Breakdown
        </Title>
        
        <div className="interview-process-grid">
          {interviewProcesses.map((process, index) => (
            <div key={index} className="process-card">
              <div className="process-header">
                <div className="company-name">{process.company}</div>
                <div className="position-type">{process.position}</div>
              </div>
              <div className="process-steps">
                {process.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="process-step">
                    <div className="step-number">{stepIndex + 1}</div>
                    <div className="step-content">
                      <div className="step-title">{step.title}</div>
                      <div className="step-description">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stats-section">
          <Title level={3} className="section-title" style={{ fontSize: '48px', marginBottom: '32px' }}>
            Our Interview Success
          </Title>
          <div className="stats-grid">
            {interviewStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInterviews;
