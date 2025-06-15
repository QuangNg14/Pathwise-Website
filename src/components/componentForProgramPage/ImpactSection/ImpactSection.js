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
            Master cutting-edge technologies and frameworks used by top tech
            companies
          </p>
        </div>

        {/* First Layout - Updated Resume Content with Bullet Points */}
        <div className="impact-item">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <div className="content-wrapper">
                <div className="impact-icon">📄</div>
                <h3 className="impact-title">Improve Profile</h3>
                <span className="impact-subtitle">Resume + LinkedIn</span>
                <div className="impact-description">
                  <ul className="impact-list">
                    <li>
                      Create professional resumes with{" "}
                      <span className="highlight-keyword">
                        ATS optimization
                      </span>
                    </li>
                    <li>Master industry-specific formatting and techniques</li>
                    <li>
                      Build compelling{" "}
                      <span className="highlight-keyword">
                        LinkedIn profiles
                      </span>{" "}
                      that attract recruiters
                    </li>
                    <li>Optimize GitHub portfolios with project showcases</li>
                    <li>
                      Receive personalized feedback through individual reviews
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} className="image-column">
              <img
                src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/pngoim1ab9al3dce0niv.jpg"
                alt="Profile Improvement"
                className="single-image"
              />
            </Col>
          </Row>
        </div>

        {/* Second Layout - Updated Projects Content with Bullet Points */}
        <div className="impact-item">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12} className="image-column">
              <img
                src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/zl6k4t8jklgzvuppqs97.jpg"
                alt="Technical Projects Development"
                className="single-image"
              />
            </Col>
            <Col xs={24} md={12}>
              <div className="content-wrapper">
                <div className="impact-icon">🚀</div>
                <h3 className="impact-title">
                  Build Advanced Technical Projects
                </h3>
                <span className="impact-subtitle">
                  Backend + AI + Full-stack + Cloud
                </span>
                <div className="impact-description">
                  <ul className="impact-list">
                    <li>
                      Develop{" "}
                      <span className="highlight-keyword">
                        scalable backend systems
                      </span>{" "}
                      with microservices architecture
                    </li>
                    <li>
                      Create{" "}
                      <span className="highlight-keyword">
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
                </div>
                <div className="tech-stack">
                  <div className="tech-category">
                    <span className="category-label">Backend & Cloud:</span>
                    <div className="tech-tags">
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">Python</span>
                      <span className="tech-tag">AWS</span>
                      <span className="tech-tag">Docker</span>
                      <span className="tech-tag">PostgreSQL</span>
                    </div>
                  </div>
                  <div className="tech-category">
                    <span className="category-label">AI & Full-stack:</span>
                    <div className="tech-tags">
                      <span className="tech-tag">OpenAI API</span>
                      <span className="tech-tag">React.js</span>
                      <span className="tech-tag">Next.js</span>
                      <span className="tech-tag">TypeScript</span>
                      <span className="tech-tag">LangChain</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Third Layout - Updated Mock Interviews Content with Bullet Points */}
        <div className="impact-item">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <div className="content-wrapper">
                <div className="impact-icon">🎯</div>
                <h3 className="impact-title">Mock Interviews</h3>
                <span className="impact-subtitle">Behavioral + Technical</span>
                <div className="impact-description">
                  <ul className="impact-list">
                    <li>
                      Master behavioral interview techniques with{" "}
                      <span className="highlight-keyword">STAR method</span>
                    </li>
                    <li>
                      Research company-specific cultures and tailor responses
                    </li>
                    <li>
                      Practice technical interviews with{" "}
                      <span className="highlight-keyword">LeetCode</span>{" "}
                      problems
                    </li>
                    <li>
                      Learn{" "}
                      <span className="highlight-keyword">
                        system design principles
                      </span>{" "}
                      and architecture patterns
                    </li>
                    <li>Develop object-oriented programming expertise</li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} className="image-column">
              <img
                src="http://res.cloudinary.com/dbqcioj2g/image/upload/v1730700037/fsty7qqzsj6ecnb5dpkt.png"
                alt="Mock Interview"
                className="single-image"
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
