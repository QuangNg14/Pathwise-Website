import React from "react";
import { Row, Col, Typography } from "antd";
import { LinkedinOutlined } from "@ant-design/icons";
import "./AboutUs.css";

const { Title, Text } = Typography;

const teamMembers = [
  {
    name: "Quang Nguyen",
    role: "Head Mentor",
    linkedin: "https://www.linkedin.com/in/quang1401/",
    description: [
      "Quang Nguyen is currently a Software Engineer at Microsoft. He previously interned as a software engineer at NVIDIA (Summer 2023) and Facebook (Summer 2022).",
      "He received a full-ride scholarship worth $73,000/year for 4 years at Rice University, majoring in Computer Science.",
      "As the President of Rice Apps (Rice Software Engineering Club) at Rice University, he has mentored and taught over 60 members about professional web and mobile application development.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730786179/qz0r41jqmatncyl9h6py.jpg",
  },
  {
    name: "Tri Bui",
    role: "Mentor",
    linkedin: "https://www.linkedin.com/in/tribuidinh/",
    description: [
      "Tri Bui currently works in Risk Management at Revantage, a Blackstone portfolio company, and has interned as a Software Engineer at Daikin, DetectAuto, and Deloitte Vietnam.",
      "Founder/CEO of Esmart Solutions, a company providing communication and technology solutions to small and medium-sized businesses in Vietnam.",
      "President of the Entrepreneurship and Investment Clubs at Macalester College. He has won multiple awards in technology, finance, and entrepreneurship, with a total value exceeding $15,000.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730786150/vqyqmxshnub26yu08dpr.jpg",
  },
  {
    name: "Anh Ngo",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/anhmngo/",
    description: [
      "Anh Ngo is currently an Investment Banking Analyst at Deutsche Bank.",
      "She received a scholarship to study Economics at the University of Pennsylvania (UPenn).",
      "Vice President of the Wharton Finance Club and a member of the International Student Advisory Board at UPenn.",
      "She has extensive experience working at UPenn Career Services, where she has assisted over 200 students with resume reviews and career guidance.",
    ],
    image:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730176141/tfiotmhqb6vpkofuh5py.jpg",
  },
];

const softwareMentors = [
  {
    name: "Ha Duy Linh",
    linkedin: "https://www.linkedin.com/in/liam-ha/",
    achievements: [
      "Received Software Engineer intern offers at Palantir Technologies and Adobe for Summer 2025",
      "Software Engineer Intern at Ryco.io (EdTech start-up) Fall 2024",
      "Received return offer from Ryco.io for Spring 2025",
      "Technical Lead at Google Developer Student Club @University of South Florida",
      "Research assistant at robotics lab since freshman year",
      "Dean's List recipient (>3.9 GPA) multiple semesters",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964395/472326616_1992924671193345_2913650875363825596_n_aqof8u.jpg",
  },
  {
    name: "Thinh Nguyen",
    linkedin: "https://www.linkedin.com/in/thinh-nguyen-phuoc/",
    achievements: [
      "Received full-time Software Engineer offer at Affirm",
      "Received full-time return offer at Juniper Networks (HPE)",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964394/1711421857088_szx1ev.jpg",
  },
  {
    name: "Quynh Huong",
    linkedin: "https://www.linkedin.com/in/celine-h-hoang/",
    achievements: [
      "Received Software Engineer Intern offers from Meta, HubSpot, PayPal (Summer 2025)",
      "Software Engineer Intern at Qdrant (Summer 2024)",
      "Team Lead, Poly Programming Club @ NYU, representing NYU in competitive programming competitions",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964394/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-06-14_lu%CC%81c_12.42.32_SA_gs3aly.png",
  },
  {
    name: "Gia Hy",
    linkedin: "https://www.linkedin.com/in/lixunzzz/",
    achievements: [
      "Received offers from Meta (Summer 2025) and Microsoft (Fall 2025)",
      "Return offer Dell Technologies (Summer 2025)",
      "TensorFlow Developer Certificate, Top 30 Uber Hackathon Fall 2023 (Freshman)",
      "Part-time Machine Learning Engineer at Moffitt Department (Spring 2024)",
      "Software Engineer Intern at Dell Technologies (Summer 2024)",
      "2 papers accepted at ASC and USCAP",
      "Received 5 remote Software Engineer offers from startups (Spring 2025)",
      "Team Lead, Quantitative Trading Club @USF, representing USF in quant trading competitions",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964394/1749279504476_sv4mdx.jpg",
  },
  {
    name: "Phan Hung",
    linkedin: "https://www.linkedin.com/in/hungnguyen243/",
    achievements: [
      "Software Engineer Full-time at Google (Google Kubernetes Engine team)",
      "2x Software Engineer Intern at Google (Google Cloud UFO, Google Search teams)",
      "Software Engineer Intern at Intel Corporation",
      "Teaching Assistant at Rice University for Fundamentals of Parallel Programming and Reasoning about Algorithms",
      "Bachelor of Computer Science, Rice University",
      "Graduate of Ha Noi - Amsterdam High School for the Gifted",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964395/460849481_2514262115448368_5157228431400361790_n_xdjjjw.jpg",
  },
  {
    name: "Hung Truong",
    linkedin: "https://www.linkedin.com/in/hungtk04/",
    achievements: [
      "Adobe - Software Engineer Intern",
      "Amazon - Software Engineer Intern",
      "Morgan Stanley - Software Engineer Intern",
      "Meta - Production Engineer Intern",
      "Microsoft - Software Engineer Intern",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964394/1679190748948_i2ozqi.jpg",
  },
];

const dataMentors = [
  {
    name: "Tran Nguyen Hong Minh",
    linkedin: "https://www.linkedin.com/in/robin-tran/",
    achievements: [
      "Received Data Scientist intern offer at Rippling for Summer 2025",
      "Data Scientist Intern at Teaching Lab Summer 2024",
      "Participated in Research Experiences for Undergraduates in Statistics at Iowa State University Summer 2024",
      "Co-President of HackHolyoke at Mount Holyoke College",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964394/1665011908118_vzh5ur.jpg",
  },
  {
    name: "Nguyen Minh Thieu",
    linkedin: "https://www.linkedin.com/in/thieunguyen1402/",
    achievements: [
      "Received Data Science intern offer at eBay Summer 2025",
      "Junior in Statistics at USF",
      "Business Intelligence Intern at Goldman Sachs Summer 2024",
      "Software Engineer Google Summer of Code Fall 2024",
    ],
    image:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749964394/Screenshot_2025-06-14_at_00.52.24_xhmaqx.png",
  },
];

const AboutUs = () => (
  <div className="about-us-container">
    <div className="about-us-header">
      <Title level={2} className="about-us-title">
        Our Team
      </Title>
      <Text className="about-us-intro">
        We are Vietnamese students in the U.S. who have experienced many
        challenges during our studies and job search journeys here.
        Understanding the difficulties of applying to hundreds of positions
        without receiving a single interview, Pathwise Mentorship program was
        established with the mission to build a community that shares knowledge
        and experiences to help Vietnamese students achieve their dream jobs.
      </Text>
    </div>

    <div className="team-members">
      {teamMembers.map((member, index) => (
        <div
          className={`member-card ${
            index % 2 === 1 ? "member-card-reverse" : ""
          }`}
          key={index}
        >
          <div className="member-content">
            <div className="member-info">
              <div className="member-header">
                <Text className="member-name">{member.name}</Text>
                <div className="role-label">{member.role}</div>
              </div>
              <div className="member-descriptions">
                {member.description.map((paragraph, idx) => (
                  <Text key={idx} className="member-description">
                    {paragraph}
                  </Text>
                ))}
              </div>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                <LinkedinOutlined className="linkedin-icon" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
            <div className="member-image-container">
              <img
                src={member.image}
                alt={member.name}
                className="member-image"
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Supporting Mentors Section */}
    <div className="supporting-mentors-section">
      <div className="supporting-mentors-header">
        <Title level={2} className="supporting-mentors-title">
          Our Supporting Mentors
        </Title>
        <Text className="supporting-mentors-intro">
          Meet our talented supporting mentors who have achieved remarkable
          success in their respective fields and are dedicated to helping the
          next generation of Vietnamese students succeed.
        </Text>
      </div>

      {/* Software Mentors */}
      <div className="mentor-category">
        <Title level={3} className="category-title">
          Software Engineering Mentors
        </Title>
        <div className="mentors-grid">
          {softwareMentors.map((mentor, index) => (
            <div key={index} className="supporting-mentor-card">
              <div className="supporting-mentor-image-container">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="supporting-mentor-image"
                />
              </div>
              <div className="supporting-mentor-info">
                <Text className="supporting-mentor-name">{mentor.name}</Text>
                <ul className="achievements-list">
                  {mentor.achievements.map((achievement, idx) => (
                    <li key={idx} className="achievement-item">
                      {achievement}
                    </li>
                  ))}
                </ul>
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="supporting-mentor-linkedin"
                >
                  <LinkedinOutlined className="supporting-linkedin-icon" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Mentors */}
      <div className="mentor-category">
        <Title level={3} className="category-title">
          Data Science Mentors
        </Title>
        <div className="mentors-grid">
          {dataMentors.map((mentor, index) => (
            <div key={index} className="supporting-mentor-card">
              <div className="supporting-mentor-image-container">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="supporting-mentor-image"
                />
              </div>
              <div className="supporting-mentor-info">
                <Text className="supporting-mentor-name">{mentor.name}</Text>
                <ul className="achievements-list">
                  {mentor.achievements.map((achievement, idx) => (
                    <li key={idx} className="achievement-item">
                      {achievement}
                    </li>
                  ))}
                </ul>
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="supporting-mentor-linkedin"
                >
                  <LinkedinOutlined className="supporting-linkedin-icon" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;
