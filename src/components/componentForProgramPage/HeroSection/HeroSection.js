import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="overlay">
        <div className="content">
          <h1 className="hero-title">
            Introduction to the Pathwise Mentorship Program
          </h1>
          <p className="hero-description">
            <span className="highlight-text">Pathwise</span> connects university
            students with{" "}
            <span className="highlight-text">job opportunities</span> through{" "}
            <span className="highlight-text">1-on-1 mentorship</span>,{" "}
            <span className="highlight-text">career strategies</span>, and{" "}
            <span className="highlight-text">insider insights</span> – designed
            specifically for students aiming for roles in{" "}
            <span className="highlight-text">Software</span>,{" "}
            <span className="highlight-text">Data</span>, or{" "}
            <span className="highlight-text">Finance</span>.
          </p>
          <a
            href="https://www.facebook.com/pathwise.mentorship"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            View Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
