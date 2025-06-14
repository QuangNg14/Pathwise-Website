import React from "react";
import { Card, Typography, Carousel } from "antd";
import "./MenteeShowcase.css";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Meta } = Card;

// Company logo SVGs with more accurate representations
const companyLogos = {
  microsoft: (
    <svg className="company-logo" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  ),
  meta: (
    <svg className="company-logo" viewBox="0 0 24 24" fill="#1877F2">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        f
      </text>
    </svg>
  ),
  paypal: (
    <svg className="company-logo" viewBox="0 0 24 24">
      <path
        fill="#003087"
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.434-.983 4.237-4.053 6.199-8.74 6.199h-1.92c-.424 0-.79.308-.85.728l-.542 3.79-.024.168a.641.641 0 0 1-.633.57z"
      />
      <path
        fill="#009CDE"
        d="M18.446 3.005c-.983 4.237-4.053 6.199-8.74 6.199h-1.92c-.424 0-.79.308-.85.728l-.542 3.79-.024.168a.641.641 0 0 1-.633.57H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81.302.345.5.729.65 1.134z"
      />
    </svg>
  ),
  adobe: (
    <svg className="company-logo" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M13.966 22.624c0 .374.303.677.677.677h4.594c.374 0 .677-.303.677-.677V1.376c0-.374-.303-.677-.677-.677h-4.594c-.374 0-.677.303-.677.677v21.248zM4.763 22.624c0 .374.303.677.677.677h4.594c.374 0 .677-.303.677-.677V1.376c0-.374-.303-.677-.677-.677H5.44c-.374 0-.677.303-.677.677v21.248z" />
      <polygon fill="#FF0000" points="9.034,1 15.034,1 12.034,12" />
    </svg>
  ),
  hubspot: (
    <svg className="company-logo" viewBox="0 0 24 24" fill="#FF7A59">
      <circle cx="12" cy="12" r="11" fill="#FF7A59" />
      <circle cx="8" cy="12" r="2" fill="white" />
      <circle cx="16" cy="12" r="2" fill="white" />
      <rect x="8" y="11" width="8" height="2" fill="white" />
    </svg>
  ),
  "morgan-stanley": (
    <svg className="company-logo" viewBox="0 0 24 24" fill="#0F4C8C">
      <rect x="2" y="2" width="20" height="20" fill="#0F4C8C" rx="2" />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        MS
      </text>
    </svg>
  ),
};

const mentors = [
  {
    name: "Gia Hy",
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730616070/bh5pqnyayotoxprcoafs.jpg",
    university: "University of South Florida",
    offers:
      "Software Engineer Intern, Meta\nSoftware Engineer Intern, Microsoft",
    companies: ["meta", "microsoft"],
  },
  {
    name: "Hoàng Quỳnh Hương",
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730615998/wzq64kqpmmkkdsypdf1f.jpg",
    university: "New York University",
    offers:
      "Software Engineer Intern, Meta\nSoftware Engineer Intern, Paypal\nSoftware Engineer Intern, Hubspot",
    companies: ["meta", "paypal", "hubspot"],
  },
  {
    name: "Trương Khánh Hưng",
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730773203/jafp7uywccmrdsibqcus.jpg",
    university: "University of South Florida",
    offers:
      "Software Engineer Intern, Adobe\nSoftware Engineer Intern, Morgan Stanley\nProduction Engineer Intern, Meta\nSoftware Engineer Intern, Microsoft",
    companies: ["adobe", "morgan-stanley", "meta", "microsoft"],
  },
];

const MenteeShowcase = () => {
  const router = useRouter();

  return (
    <div className="mentor-showcase-container">
      <Title level={2} className="section-title">
        Students of Pathwise Mentorship
      </Title>

      <div className="call-to-action">
        <button
          className="custom-button"
          onClick={() => router.push("/results")}
        >
          Learn more
        </button>
      </div>

      <Carousel
        arrows
        dots={false}
        infinite
        slidesToShow={3}
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ]}
      >
        {mentors.map((mentor, index) => (
          <div key={index} className="carousel-slide">
            <Card hoverable className="mentor-card">
              <div className="mentee-avatar-container">
                <img
                  alt={mentor.name}
                  src={mentor.image}
                  className="mentee-avatar"
                />
              </div>
              <Meta
                title={mentor.name}
                description={mentor.university}
                className="mentor-meta"
              />
              <div className="mentor-company">
                {mentor.offers.split("\n").map((offer, idx) => (
                  <div key={idx}>{offer}</div>
                ))}
              </div>
              {/* <div className="company-logos">
                {mentor.companies.map((company, idx) => (
                  <div key={idx}>
                    {companyLogos[company]}
                  </div>
                ))}
              </div> */}
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MenteeShowcase;
