"use client";
import { Layout, Row, Col, Typography, Button } from "antd";
import { useState } from "react";
import ServiceRow from "@/components/serviceRow/serviceRow";
import HeaderComponent from "@/components/header/header";
import MentorCarousel from "@/components/MentorCarousel/MentorCarousel";
import LandYourDreamJob from "@/components/LandYourDreamJob/LandYourDreamJob";
import Features from "@/components/Features/Features";
import AchievementGallery from "@/components/AchievementGallery/AchievementGallery";
import Community from "@/components/Community/Community";
import FAQ from "@/components/FAQ/FAQ";
import Footer from "@/components/footer/footer";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const mentors = [
  {
    name: "Nguyễn Nhật Quang",
    title: "Head Mentor",
    company: "Software Engineer at Microsoft",
    companyLogos: [
      "https://www.microsoft.com/en-us/education/blog/wp-content/themes/xtheme-moray/dist/images/default-avatar.png",
      "https://1000logos.net/wp-content/uploads/2021/10/Meta-Symbol.png",
      "https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/02-nvidia-logo-color-grn-500x200-4c25-p@2x.png",
      "https://seeklogo.com/images/T/tiktok-logo-1F4A5DCD45-seeklogo.com.png",
    ],
    image:
      "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-1/448138042_2302390733425703_8746037523344529093_n.jpg?stp=dst-jpg_p480x480&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z2mGQYHNmPUQ7kNvgEjNzI6&_nc_ht=scontent-lga3-1.xx&oh=00_AYD_GXiK_RBB0u8y3lUysHPHiF4aHd_ZV_f63eyit6xSAQ&oe=6676C328",
  },
  {
    name: "Bùi Đình Trí",
    title: "Tech Mentor",
    company: "Risk Analyst at BlackStone",
    companyLogos: [
      "https://static.stocktitan.net/company-logo/bx.png",
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/30cd1378bfa8b1b15fd194651407a294",
    ],
    image:
      "https://scontent.xx.fbcdn.net/v/t1.15752-9/403402128_697852232454059_2894918291068316424_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=becujhE-T4YQ7kNvgExMOW4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QFBGJh7db1Gg8LjuAnb9uNpE5yIXOG4IIhrXIhtgnkuxw&oe=669877C2",
  },
  {
    name: "Ngô Minh Anh",
    title: "Finance Mentor",
    company: "Investment Banking at Deutsche Bank",
    companyLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Deutsche_Bank_logo_without_wordmark.svg/2048px-Deutsche_Bank_logo_without_wordmark.svg.png",
      "https://eu-images.contentstack.com/v3/assets/blt6b0f74e5591baa03/blt3f899c1015331339/65033d0da54b2d514f4ee54d/News_Image_(29).png?disable=upscale&width=1200&height=630&fit=crop",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/BCG_Corporate_Logo.svg/1200px-BCG_Corporate_Logo.svg.png",
    ],
    image:
      "https://media.licdn.com/dms/image/D4D03AQEEr-8lv1QRdw/profile-displayphoto-shrink_800_800/0/1683139546538?e=1724284800&v=beta&t=TDUk5YmsBgMtgeg0I3ymW3NN-wedwludACOiKPOiazI",
  },
];

export default function Home() {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <Content>
        <div className="site-layout-content">
          <Row style={{ padding: "80px 120px 80px 120px" }}>
            <Col span={12} style={{ height: "520px" }}>
              <Title
                style={{ fontWeight: 400, fontSize: 72, lineHeight: "93.6px" }}
              >
                Peer-to-peer mentoring
              </Title>
              <Text
                style={{ fontWeight: 400, fontSize: 24, lineHeight: "29.05px" }}
              >
                Các mentors có kinh nghiệm làm việc ở các công ty Big Tech giúp
                bạn land được internships/jobs tiếp theo
              </Text>
              <div className="buttons-container">
                <Button className="custom-button">Tư vấn du học &rarr;</Button>
                <Button className="custom-button">
                  Tư vấn tìm việc &rarr;
                </Button>
                <Button className="custom-button">Sửa CV &rarr;</Button>
                <Button className="custom-button">Phỏng vấn thử &rarr;</Button>
              </div>
            </Col>
            <Col span={12}>
              <img
                src="https://media.licdn.com/dms/image/D4D12AQHCmuoeL378Uw/article-cover_image-shrink_720_1280/0/1694448835716?e=2147483647&v=beta&t=d0X3A6-qbmPi50t7eTUykXF5RLOq--_L036h2wJmHVA"
                alt="Peer-to-peer mentoring"
                width={500}
                height={300}
              />
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{
              padding: "64px 120px 80px 120px",
              backgroundColor: "#F5F6F9",
            }}
          >
            <Col span={24} style={{ marginBottom: 40 }}>
              <Title
                level={2}
                style={{
                  fontWeight: 400,
                  fontSize: 54,
                  lineHeight: "65.35px",
                  textAlign: "center",
                }}
              >
                Meet your mentor
              </Title>
            </Col>
            <MentorCarousel mentors={mentors} />
          </Row>
          <ServiceRow />
          <LandYourDreamJob />
          <Features />
          <AchievementGallery />
          <Community/>
          <FAQ/>
          <Footer/>
        </div>
      </Content>
    </Layout>
  );
}
