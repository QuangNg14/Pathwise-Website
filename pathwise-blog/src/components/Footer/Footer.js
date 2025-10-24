"use client";

import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="blog-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sponsored by Pathwise</h3>
          <p>Latest insights and resources for tech careers</p>
        </div>
        
        <div className="footer-section">
          <h4>Information</h4>
          <ul>
            <li>
              <Link href="https://www.thepathwise.org/mentors" target="_blank">
                Our Mentors
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/outcomes" target="_blank">
                Outcomes Report
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/stories" target="_blank">
                Fellow Stories
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/faq" target="_blank">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="https://www.thepathwise.org/about" target="_blank">
                About
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/contact" target="_blank">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/">Blog</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Industry Tracks</h4>
          <ul>
            <li>
              <Link href="https://www.thepathwise.org/software-engineering" target="_blank">
                Software Engineering
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/data" target="_blank">
                Data
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/investment-banking" target="_blank">
                Investment Banking
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Social</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/company/pathwise" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/pathwise" target="_blank" rel="noopener noreferrer">
                Facebook ↗
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/pathwise" target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
            </li>
            <li>
              <a href="https://www.threads.net/@pathwise" target="_blank" rel="noopener noreferrer">
                Threads ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pathwise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

