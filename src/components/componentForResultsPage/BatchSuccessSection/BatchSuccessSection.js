import React from "react";
import { useRouter } from "next/navigation";
import "./BatchSuccessSection.css";

const BatchSuccessSection = () => {
  const router = useRouter();

  const handleApplyClick = () => {
    // Navigate to the main page and scroll to the application section
    router.push("/#application");
  };

  return (
    <div className="batch-success-section">
      <div className="batch-success-content">
        <div className="success-header">
          <h1 className="batch-title">🎉 Batch 4/2025 Success Story 🎉</h1>
          <p className="batch-subtitle">
            Exceptional results achieved during the off-season for summer
            internships
          </p>
        </div>

        <div className="success-stats">
          <div className="stat-card">
            <div className="stat-number">22</div>
            <div className="stat-label">Total Students</div>
            <div className="stat-description">
              Dedicated mentees in our latest cohort
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-number">64%</div>
            <div className="stat-label">Success Rate</div>
            <div className="stat-description">
              Industry-leading placement rate
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">14</div>
            <div className="stat-label">Secured Internships</div>
            <div className="stat-description">
              Summer 2026 US internship offers
            </div>
          </div>
        </div>

        <div className="success-highlights">
          <div className="highlight-item">
            <div className="highlight-icon">🏆</div>
            <h3 className="highlight-title">Off-Season Success</h3>
            <p className="highlight-description">
              Achieved remarkable results during the challenging Fall-Winter
              period when most companies aren&apos;t actively recruiting for
              summer internships.
            </p>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon">🎯</div>
            <h3 className="highlight-title">Top-Tier Companies</h3>
            <p className="highlight-description">
              Our students secured positions at leading tech companies,
              financial institutions, and innovative startups across the United
              States.
            </p>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon">🚀</div>
            <h3 className="highlight-title">Proven Methodology</h3>
            <p className="highlight-description">
              Our comprehensive 12-week program combining technical skills,
              interview preparation, and personalized mentorship delivers
              consistent results.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Join Our Next Success Story?</h3>
          <p className="cta-description">
            Applications for Batch 5/2025 are now open. Don&apos;t miss your
            chance to be part of our next cohort of successful mentees.
          </p>
          <button className="cta-button" onClick={handleApplyClick}>
            Apply for Batch 5/2025
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchSuccessSection;
