import React from "react";
import { useRouter } from "next/navigation";
import { navigateToApplication } from "@/utils/navigation";
import "./BatchSuccessSection.css";

const BatchSuccessSection = () => {
  const router = useRouter();

  const handleApplyClick = () => {
    // Navigate to the main page and scroll to the application section
    navigateToApplication(router);
  };

  return (
    <div className="batch-success-section">
      <div className="batch-success-content">
        <div className="success-header">
          <h1 className="batch-title">
            🎉 Batch 5/2025 Success Story (Jul 2025 - Jan 2026) 🎉
          </h1>
          <p className="batch-subtitle">
            Training for both off-season and on-season recruiting to land Summer
            2026 internships and new grad roles, even in an incredibly
            competitive year.
          </p>
        </div>

        <div className="success-stats">
          <div className="stat-card">
            <div className="stat-number">
              <span className="stat-number-main">30</span>
              <span className="stat-number-suffix">+</span>
            </div>
            <div className="stat-label">Total Students</div>
            <div className="stat-description">
              20+ new mentees + 10 returning mentees
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              <span className="stat-number-main">16</span>
              <span className="stat-number-suffix">+</span>
            </div>
            <div className="stat-label">Offers Secured</div>
            <div className="stat-description">
              Across internships and new grad roles
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              <span className="stat-number-main">6</span>
              <span className="stat-number-suffix">months</span>
            </div>
            <div className="stat-label">Program Timeline</div>
            <div className="stat-description">July 2025 - January 2026</div>
          </div>
        </div>

        {/* Company Logos Section */}
        <div className="company-logos-section">
          <div className="logos-header">
            <h3 className="logos-title">Where Our Students Landed</h3>
            <p className="logos-subtitle">
              Our mentees secured positions at these top-tier companies
            </p>
          </div>
          <div className="logos-image-container">
            <img
              src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1749970658/501126546_1445408036898909_2834472440713575263_n_m5bux1.png"
              alt="Pathwise Mentorship Offers - Companies including Adobe, Amazon, Bank of America, Meta, eBay, PayPal, Palantir, Microsoft, Google, HubSpot, Affirm, Morgan Stanley, Dell, Dow Jones, Alcon, United Healthcare"
              className="logos-image"
            />
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
              Our 6-month intensive training and mentoring program improves
              everything from resume and projects to interviews, networking, and
              personalized coaching—delivering consistent results year after
              year.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Join Our Next Success Story?</h3>
          <p className="cta-description">
            Applications for Batch 6/2025 are now open! Don &apos;t miss your
            chance to be part of our next cohort of successful mentees.
          </p>
          <button className="cta-button" onClick={handleApplyClick}>
            Apply for Batch 6/2025
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchSuccessSection;
