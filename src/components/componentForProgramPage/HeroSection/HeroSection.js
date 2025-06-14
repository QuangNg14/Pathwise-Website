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
            Pathwise is a peer-to-peer mentorship program for university
            students seeking job opportunities in the USA. The program offers 12
            weeks of guidance with essential, focused, and personalized
            knowledge and information. It currently supports students applying
            to industries such as Software, Data, and Finance.
          </p>
          <a
            href="https://www.facebook.com/pathwise.mentorship"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
