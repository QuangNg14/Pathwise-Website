import React, { useState } from "react";
import { Row, Col, Card, Typography, Tabs } from "antd";
import { useRouter } from "next/navigation";
import { navigateToApplication } from "@/utils/navigation";
import "./OffersSection.css";

const { Title, Text } = Typography;

const offersData = [
  {
    name: "Hoàng Quỳnh Hương",
    school: "New York University",
    major: "Computer Science",
    category: "software",
    offers: [
      "Meta - Software Engineer Intern",
      "Paypal - Software Engineer Intern",
      "HubSpot - Software Engineer Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730615998/wzq64kqpmmkkdsypdf1f.jpg",
  },
  {
    name: "Gia Hy",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Meta - Software Engineer Intern",
      "Microsoft - Software Engineer Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1730616070/bh5pqnyayotoxprcoafs.jpg",
  },
  {
    name: "Mentee",
    school: "University of Washington",
    major: "Computer Science",
    category: "software",
    offers: ["Meta - Software Engineer Intern"],
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    name: "Đặng Thanh Vân",
    school: "Vanderbilt University",
    major: "Computer Science",
    category: "software",
    offers: [
      "Google - Software Engineer Intern",
      "Google STEP - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733952244/oueigloxkovcns1mhnpd.jpg",
  },
  {
    name: "Trang Phan",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: ["Bank of America - Software Engineer Intern"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1767830453/trang_phan_bank_of_america_rdskcn.jpg",
  },
  {
    name: "Bách Nguyễn",
    school: "Iowa State University",
    major: "Computer Science",
    category: "software",
    offers: ["Microsoft - Software Engineer Intern"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1767830456/bach_nguyen_microsoft_w5utws.jpg",
  },
  {
    name: "Trần Hoàng Quân",
    school: "University of South Florida",
    major: "Computer Science",
    category: "data",
    offers: ["Publix Super Market - Data Analyst Intern"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1767830596/quan_tran_data_publix_wlkq4t.jpg",
  },
  {
    name: "Hà Tố Như",
    school: "Lehigh University",
    major: "Computer Science",
    category: "software",
    offers: ["Lutron Electronics - Software Engineer Intern"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1767830451/nhu_ha_lutron_saqah0.jpg",
  },
  {
    name: "Lê Đức Minh",
    school: "Georgia Institute of Technology",
    major: "Computer Science",
    category: "data",
    offers: [
      "A37 - Machine Learning Engineer Intern",
      "Total Energies - MLE Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1767830452/le_duc_minh_A37_lvegzq.jpg",
  },
  {
    name: "Cao Phương An",
    school: "Texas Christian University",
    major: "Data Science",
    category: "data",
    offers: ["Alcon - Data Science Intern", "Netflix X Formation Program"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1732175391/shehrfpv16a1wqairtrs.jpg",
  },
  {
    name: "Minh Thiều",
    school: "University of South Florida",
    major: "Statistics",
    category: "data",
    offers: [
      "Ebay - Data Science Intern",
      "Microsoft - Financial Analyst Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1732175391/ce0qiw285pc5uf7igsbu.jpg",
  },
  {
    name: "Trương Khánh Hưng",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Adobe - Software Engineer Intern",
      "Amazon - Software Engineer Intern",
      "Morgan Stanley - Software Engineer Intern",
      "Meta - Production Engineer Intern",
      "Microsoft - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730773203/jafp7uywccmrdsibqcus.jpg",
  },
  {
    name: "Đỗ Hoàng Long",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Coinbase - Software Engineer Intern",
      "Scale AI - Software Engineer Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1743519564/zu270d8swx3ag6pm5m9u.jpg",
  },
  {
    name: "Phương Anh",
    school: "Gettysburg College",
    major: "Computer Science",
    category: "software",
    offers: [
      "Rippling - Software Engineer Intern",
      "Wayfair - Software Engineer Intern",
      "A&T Technology Development Program Internship",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1744173236/kflrsx3spzxexjxyo6uf.jpg",
  },
  {
    name: "Bảo Trân",
    school: "Lehigh University",
    major: "Computer Science",
    category: "software",
    offers: ["AWS - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743519785/qnbpa1u5fxv7d9jpcczk.jpg",
  },
  {
    name: "Cao Minh Hiếu",
    school: "Georgia State University",
    major: "Computer Science",
    category: "software",
    offers: ["LexisNexis - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1745387467/nxztk80xv90dblti1jte.jpg",
  },
  {
    name: "Riley Phan",
    school: "Texas Christian University",
    major: "Computer Science",
    category: "software",
    offers: ["Doordash - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1745387467/xviucp9uwguilicpbaqk.jpg",
  },
  {
    name: "Ngô Nhật Uyên",
    school: "DePauw University",
    major: "Computer Science",
    category: "software",
    offers: ["Veryable - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1745387466/bdtn78bvow6jjlmvauco.jpg",
  },
  {
    name: "Lê Duy Khanh",
    school: "Villanova University",
    major: "Computer Science",
    category: "software",
    offers: [
      "Bloomberg - Software Engineer Intern",
      "Perpay - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1744173067/dy1yr5tksvngh4tmbmzc.jpg",
  },
  {
    name: "Gia Mẫn",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Bloomberg - Software Engineer Intern",
      "Arista Network - Software Engineer Intern",
      "Morgan Stanley - Software Engineer Intern",
      "Goldman Sachs - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743520120/fbck0mbj5wegivrmya5n.jpg",
  },
  {
    name: "Quỳnh Anh",
    school: "Rose-Hulman Institute of Technology",
    major: "Computer Science",
    category: "software",
    offers: [
      "Snowflake - Software Engineer Intern",
      "Coinbase - Software Engineer Intern",
      "Wayfair - Software Engineer Intern",
      "Toast - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743520513/oyyyqgfx5bxjc62tkrti.jpg",
  },
  {
    name: "Phương Tâm",
    school: "University of South Florida",
    major: "Business Analytics",
    category: "data",
    offers: ["VSP - Data Analyst Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743520733/q0ihm08r25r4p22ghn6z.jpg",
  },
  {
    name: "Phạm Minh Hạnh",
    school: "Mount Holyoke College",
    major: "Data Science",
    category: "data",
    offers: ["The Chemours Company - Data Science Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743520912/cr8jnarcn7dftdnkmowb.jpg",
  },
  {
    name: "Bảo Nhi",
    school: "Drexel University",
    major: "Computer Science",
    category: "data",
    offers: ["Amazon - Business Intelligence Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/sqsmkahbvmgdqb1wlhrh.jpg",
  },
  {
    name: "Trang Dang",
    school: "Davidson College",
    major: "Economics",
    category: "finance",
    offers: [
      "Evercore - Investment Banking Summer Analyst 2026",
      "Bank of America - Investment Banking Summer Analyst 2026",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743521131/mxruphejnkywd0gqp76m.jpg",
  },
  {
    name: "Thu Vu",
    school: "Colby College",
    major: "Mathematical Science and Economics",
    category: "finance",
    offers: ["Bank of America - Investment Banking Summer Analyst 2026"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743521286/cvajpazjzvkdwdhk81b1.jpg",
  },
  {
    name: "Hiệp Nguyễn",
    school: "Villanova University",
    major: "Computer Science",
    category: "data",
    offers: ["Dell - Data Science Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733611066/kcjglzb0hqksfrnkm7u2.jpg",
  },
  {
    name: "Minh Nguyen",
    school: "Northeastern University",
    major: "Computer Science",
    category: "software",
    offers: [
      "Remitly - Software Engineer Intern",
      "Motherduck - Software Engineer Intern",
    ],
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    name: "Phạm Thục Quyên",
    school: "Washington and Lee University",
    major: "Computer Science",
    category: "software",
    offers: ["Bank of America - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/aj9loljr04mndd17yxxr.jpg",
  },
  {
    name: "Nguyễn Thu Huệ",
    school: "DePauw University",
    major: "Computer Science",
    category: "software",
    offers: [
      "Microsoft - Software Engineer Intern",
      "Bank of America - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/mzb59fgv7xsx2kvnkpyp.jpg",
  },
  {
    name: "Phạm Quang Hưng",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Google - Software Engineer Intern",
      "Dell - Software Engineer Intern",
    ],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1743515468/r44bm5jqbnqjtkfjnvhy.jpg",
  },
  {
    name: "Minh Trí",
    school: "Indiana University",
    major: "Computer Science",
    category: "software",
    offers: ["DwyerOmega - Software Engineer Intern"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1743521613/epuhywdeialb9zzgez77.jpg",
  },
  {
    name: "Lê Hoàng Minh",
    school: "University of California, Berkeley",
    major: "Statistics",
    category: "data",
    offers: [
      "Bill.com - Machine Learning Engineer Intern",
      "Autodesk - Data Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733882589/x9rziqrmc1jfpy7e6umh.jpg",
  },
  {
    name: "Ngô Quang Tùng",
    school: "University of Massachusetts Amherst",
    major: "Computer Science",
    category: "software",
    offers: ["UST - Software Engineer Intern"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749969670/tung_ngo_ovjra8.jpg",
  },
  {
    name: "Vũ Minh Hoàng",
    school: "University of South Florida",
    major: "Data Science",
    category: "data",
    offers: ["IDEXX - Data Engineer Intern"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1749969670/475818142_1130407918587484_8109007352114431096_n_gztz8p.jpg",
  },
  {
    name: "Hà Duy Linh",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "HubSpot - Software Engineer Intern",
      "Robinhood - Software Engineer Intern",
      "Bloomberg - Software Engineer Intern",
      "Palantir - Software Engineer Intern",
      "Adobe - Software Engineer Intern",
      "Ryco.io - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1730660431/dqo5ywsyrbu5xithxktk.jpg",
  },
  {
    name: "Phạm Anh Dũng",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Tesla - Software Engineer Intern",
      "RepRally - Software Engineer Intern",
      "Actualization.ai - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734133665/wo8x573yzafpbbpiucwc.jpg",
  },
  {
    name: "Tony Nguyễn",
    school: "University of South Florida",
    major: "Computer Science",
    category: "software",
    offers: [
      "Tesla - Software Engineer Intern",
      "HubSpot - Software Engineer Intern",
      "Microsoft - Software Engineer Intern",
      "Dow Jones - Software Engineer Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1734133661/mhep5r2ecn798dnmswcf.jpg",
  },
  {
    name: "Mentee",
    school: "Soka Univeristy",
    major: "Computer Science",
    category: "software",
    offers: ["HubSpot - Software Engineer Intern"],
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    name: "Minh Đỗ",
    school: "DePauw University",
    major: "Actuarial Science, Computer Science",
    category: "finance",
    offers: [
      "UnitedHealth Group - Actuarial Analyst Intern",
      "Kuvare Holdings - Actuarial Analyst Intern",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1732175391/rqnz7pcokxynvmcmzkq1.jpg",
  },
];

const newGradOffersData = [
  {
    name: "Thông Nguyễn",
    school: "University of Wisconsin-Madison",
    major: "Computer Science",
    offers: ["Bloomberg - Software Engineer"],
    avatar:
      "https://res.cloudinary.com/dbqcioj2g/image/upload/v1767830450/thong_nguyen_bloomberg_o662iq.jpg",
  },
  {
    name: "Thịnh Nguyễn",
    school: "University of Massachusetts Amherst",
    major: "Computer Science",
    offers: [
      "Affirm - Software Engineer",
      "Juniper Networks - Software Engineer",
    ],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733611066/dqqyfsubaiwxmnfdchvy.jpg",
  },
  {
    name: "Linda Nguyễn",
    school: "University of South Florida",
    major: "Computer Science",
    offers: ["Microsoft - Software Engineer"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733618484/adkwacjsdezx0zy5ksmq.jpg",
  },
  {
    name: "Nguyên Trần",
    school: "Columbia University",
    major: "Computer Science",
    offers: ["Morgan Stanley - Software Engineer"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733021477/ngjmq0jn6clk5j8ivhtp.jpg",
  },
  {
    name: "Xuân Thu",
    school: "Reed College",
    major: "Computer Science",
    offers: ["Morgan Stanley - Investment Analyst Parametric"],
    avatar:
      "http://res.cloudinary.com/dbqcioj2g/image/upload/v1733021478/qe4e5kiasugryll3inue.jpg",
  },
];

const MenteeCard = ({ mentee }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const cardClasses = [
    "offer-card",
    mentee.offers.length > 1 ? "has-multiple-offers" : "",
    isExpanded ? "expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card className={cardClasses} hoverable>
        <div className="card-content">
          <div className="mentee-avatar-container">
            <img
              src={mentee.avatar}
              alt={mentee.name}
              className="mentee-avatar"
            />
          </div>
          <div className="mentee-details">
            <div className="mentee-info-section">
              <Text className="mentee-name">{mentee.name}</Text>
              <Text className="mentee-info">{mentee.school}</Text>
              <Text className="mentee-info">{mentee.major}</Text>
            </div>
            <div className="mentee-offers">
              <Text className="offers-title">Offers:</Text>
              <ul className="offers-list">
                {mentee.offers.map((offer, idx) => (
                  <li
                    key={idx}
                    className={`offer-text ${
                      idx === 0 ? "primary-offer" : "secondary-offer"
                    }`}
                  >
                    {offer}
                  </li>
                ))}
              </ul>
              {mentee.offers.length > 1 && (
                <div className="expand-indicator" onClick={toggleExpanded}>
                  {isExpanded
                    ? "▲ Click to collapse"
                    : `▼ +${mentee.offers.length - 1} more offers`}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

const OffersSection = () => {
  const [activeTab, setActiveTab] = useState("software");
  const router = useRouter();

  const handleApplyClick = () => {
    // Navigate to the main page and scroll to the application section
    navigateToApplication(router);
  };

  const tabItems = [
    {
      key: "software",
      label: "Software Engineering",
      children: (
        <Row gutter={[32, 32]}>
          {offersData
            .filter((mentee) => mentee.category === "software")
            .map((mentee, index) => (
              <MenteeCard key={index} mentee={mentee} />
            ))}
        </Row>
      ),
    },
    {
      key: "data",
      label: "Data Science/Engineering/Analytics",
      children: (
        <Row gutter={[32, 32]}>
          {offersData
            .filter((mentee) => mentee.category === "data")
            .map((mentee, index) => (
              <MenteeCard key={index} mentee={mentee} />
            ))}
        </Row>
      ),
    },
    {
      key: "finance",
      label: "Finance & Investment Banking",
      children: (
        <Row gutter={[32, 32]}>
          {offersData
            .filter((mentee) => mentee.category === "finance")
            .map((mentee, index) => (
              <MenteeCard key={index} mentee={mentee} />
            ))}
        </Row>
      ),
    },
  ];

  return (
    <div className="offers-section">
      <div className="offers-content">
        <Title level={2} className="section-title">
          Internship Offers Summer 2025 + 2026
        </Title>
        <Tabs
          defaultActiveKey="software"
          items={tabItems}
          onChange={setActiveTab}
          className="offers-tabs"
        />
        <div className="new-grad-section">
          <Title level={2} className="section-title new-grad-title">
            New Grad Offers 2025 + 2026
          </Title>
          <Row gutter={[32, 32]}>
            {newGradOffersData.map((mentee, index) => (
              <MenteeCard key={index} mentee={mentee} />
            ))}
          </Row>
        </div>

        {/* CTA Section */}
        <div className="offers-cta-section">
          <div className="offers-cta-content">
            <Title level={3} className="offers-cta-title">
              Ready to Join Our Success Stories?
            </Title>
            <Text className="offers-cta-description">
              These results span Summer 2026 internships and new grad roles.
              Join our next batch and become part of our growing community of
              successful mentees landing offers at top companies.
            </Text>
            <button className="offers-cta-button" onClick={handleApplyClick}>
              Apply for Batch 6/2025
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
