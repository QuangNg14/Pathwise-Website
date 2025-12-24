import React from "react";
import { Row, Col } from "antd";
import "./ImpactSection.css";

const ImpactSection = () => {
  return (
    <div className="impact-section">
      <div className="impact-section-content">
        <div className="section-header">
          <h2 className="section-title">
            Build Industry-Ready Technical Skills
          </h2>
          <p className="section-subtitle">
            Pathwise Mentorship 2026 is a restructured, 6‑month program to make
            you job‑ready in Tech (Software, Data), Finance, and US Admissions.
          </p>
          <div className="section-pillars">
            <div className="pillar-card">
              <div className="pillar-title">Software Track</div>
              <div className="pillar-text">
                LeetCode roadmap built from recent OAs and Big Tech interviews,
                focusing on patterns, clean explanations, and live rehearsal.
              </div>
            </div>
            <div className="pillar-card">
              <div className="pillar-title">Data Track</div>
              <div className="pillar-text">
                SQL‑first curriculum with Python &amp; Power BI, end‑to‑end
                projects, and curated US fellowships aligned to 2027
                applications.
              </div>
            </div>
            <div className="pillar-card">
              <div className="pillar-title">Selective Intake</div>
              <div className="pillar-text">
                Admission interviews to keep cohorts small, focused, and
                high‑signal - built for mentees ready to have commitment and
                grow long-term.
              </div>
            </div>
          </div>
        </div>

        {/* First Layout - Profile */}
        <div className="impact-item">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <div className="content-wrapper">
                <div className="impact-icon-clean">📄</div>
                <h3 className="impact-title-clean">Improve Profile</h3>
                <div className="impact-badge">Resume + LinkedIn</div>
                <ul className="impact-list-clean">
                  <li>
                    Create professional resumes with{" "}
                    <span className="text-highlight">ATS optimization</span>
                  </li>
                  <li>Master industry-specific formatting and techniques</li>
                  <li>
                    Build compelling{" "}
                    <span className="text-highlight">LinkedIn profiles</span>{" "}
                    that attract recruiters
                  </li>
                  <li>Optimize GitHub portfolios with project showcases</li>
                  <li>
                    Receive personalized feedback through individual reviews
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={12} className="image-column">
              <img
                src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/pngoim1ab9al3dce0niv.jpg"
                alt="Profile Improvement"
                className="single-image-clean"
              />
            </Col>
          </Row>
        </div>

        {/* Second Layout - Projects */}
        <div className="impact-item">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12} className="image-column order-2-mobile">
              <img
                src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/zl6k4t8jklgzvuppqs97.jpg"
                alt="Technical Projects Development"
                className="single-image-clean"
              />
            </Col>
            <Col xs={24} md={12} className="order-1-mobile">
              <div className="content-wrapper">
                <div className="impact-icon-clean">🚀</div>
                <h3 className="impact-title-clean">
                  Build Advanced Technical Projects
                </h3>
                <div className="impact-badge">
                  Backend + AI + Full-stack + Cloud
                </div>
                <ul className="impact-list-clean">
                  <li>
                    Develop{" "}
                    <span className="text-highlight">
                      scalable backend systems
                    </span>{" "}
                    with microservices architecture
                  </li>
                  <li>
                    Create{" "}
                    <span className="text-highlight">
                      AI-powered applications
                    </span>{" "}
                    using LLMs and machine learning
                  </li>
                  <li>
                    Build full-stack cloud solutions with modern frameworks
                  </li>
                  <li>Implement DevOps practices and CI/CD pipelines</li>
                  <li>
                    Deploy production-ready applications on cloud platforms
                  </li>
                </ul>
                <div className="tech-stack-clean">
                  <div className="tech-category-clean">
                    <span className="category-label-clean">
                      Backend & Cloud:
                    </span>
                    <div className="tech-tags-clean">
                      <span className="tech-tag-clean">Node.js</span>
                      <span className="tech-tag-clean">Python</span>
                      <span className="tech-tag-clean">AWS</span>
                      <span className="tech-tag-clean">Docker</span>
                      <span className="tech-tag-clean">PostgreSQL</span>
                    </div>
                  </div>
                  <div className="tech-category-clean">
                    <span className="category-label-clean">
                      AI & Full-stack:
                    </span>
                    <div className="tech-tags-clean">
                      <span className="tech-tag-clean">OpenAI API</span>
                      <span className="tech-tag-clean">React.js</span>
                      <span className="tech-tag-clean">Next.js</span>
                      <span className="tech-tag-clean">TypeScript</span>
                      <span className="tech-tag-clean">LangChain</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Third Layout - Mock Interviews */}
        <div className="impact-item">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <div className="content-wrapper">
                <div className="impact-icon-clean">🎯</div>
                <h3 className="impact-title-clean">Mock Interviews</h3>
                <div className="impact-badge">Behavioral + Technical</div>
                <ul className="impact-list-clean">
                  <li>
                    Master behavioral interview techniques with{" "}
                    <span className="text-highlight">STAR method</span>
                  </li>
                  <li>
                    Research company-specific cultures and tailor responses
                  </li>
                  <li>
                    Practice technical interviews with{" "}
                    <span className="text-highlight">LeetCode</span> problems
                  </li>
                  <li>
                    Learn{" "}
                    <span className="text-highlight">
                      system design principles
                    </span>{" "}
                    and architecture patterns
                  </li>
                  <li>Develop object-oriented programming expertise</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={12} className="image-column">
              <img
                src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/fsty7qqzsj6ecnb5dpkt.png"
                alt="Mock Interview"
                className="single-image-clean"
              />
            </Col>
          </Row>
        </div>

        {/* Additional Tools & Technologies Section */}
        {/* <div className="tools-section">
          <h3 className="tools-title">Industry-Standard Development Tools</h3>
          <div className="tools-grid">
            <div className="tool-category">
              <h4 className="tool-category-title">
                Version Control & Collaboration
              </h4>
              <div className="tool-tags">
                <span className="tool-tag">Git</span>
                <span className="tool-tag">GitHub</span>
                <span className="tool-tag">GitLab</span>
                <span className="tool-tag">Jira</span>
                <span className="tool-tag">Slack</span>
              </div>
            </div>
            <div className="tool-category">
              <h4 className="tool-category-title">
                Testing & Quality Assurance
              </h4>
              <div className="tool-tags">
                <span className="tool-tag">Jest</span>
                <span className="tool-tag">Cypress</span>
                <span className="tool-tag">Postman</span>
                <span className="tool-tag">SonarQube</span>
                <span className="tool-tag">ESLint</span>
              </div>
            </div>
            <div className="tool-category">
              <h4 className="tool-category-title">Monitoring & Analytics</h4>
              <div className="tool-tags">
                <span className="tool-tag">Datadog</span>
                <span className="tool-tag">New Relic</span>
                <span className="tool-tag">Sentry</span>
                <span className="tool-tag">Google Analytics</span>
                <span className="tool-tag">Grafana</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ImpactSection;
