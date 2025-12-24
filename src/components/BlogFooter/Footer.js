"use client";

import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="blog-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Pathwise Network Vietnam</h3>
          <p>
            The ultimate resource for career growth in Tech, Finance, and US
            Admissions.
          </p>
        </div>

        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li>
              <Link href="https://www.thepathwise.org/" target="_blank">
                Main Site
              </Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/contact" target="_blank">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <Link href="/blog?category=Resources">Resources</Link>
            </li>
            <li>
              <Link href="/blog?category=Job%20Applications">Applications</Link>
            </li>
            <li>
              <Link href="/blog?category=Careers">Careers</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Tracks</h4>
          <ul>
            <li>
              <Link
                href="https://www.thepathwise.org/software-engineering"
                target="_blank"
              >
                Software
              </Link>
            </li>
            <li>
              <Link href="https://www.thepathwise.org/data" target="_blank">
                Data
              </Link>
            </li>
            <li>
              <Link
                href="https://www.thepathwise.org/investment-banking"
                target="_blank"
              >
                Finance
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/company/pathwise"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/pathwise"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pathwise"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Pathwise Vietnam. All rights
          reserved.
        </p>
        <p style={{ color: "#999", fontSize: "12px" }}>
          Designed for career excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
