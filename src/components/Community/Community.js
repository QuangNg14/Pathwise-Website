import React from 'react';
import { Row, Col, Typography } from 'antd';
import './Community.css'; // Assuming you have a CSS file for custom styles

const { Text } = Typography;

const Community = () => {
  const handleClick = (url) => {
    window.location.href = url; // Change this to handle the click event as needed
  };

  return (
    <div className="community-container">
      <Text className="community-title">Pathwise Community</Text>
      <Row gutter={[16, 16]} justify="center" style={{marginTop: 40}}>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div className="clickable-image" onClick={() => handleClick('https://www.facebook.com/groups/756561709660282')}>
            <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/426316485_122118393866185556_5999134257960039008_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HL2SWPRLL4gQ7kNvgF9-ZMT&_nc_ht=scontent-lga3-1.xx&oh=00_AYBPGCFnCV5YuxTMxJy6MWi48AOgAu1jaS8HDS2d2v7jGQ&oe=667BBD83" alt="Community 1" className="community-image" />
            <Text className="image-description">Group về Tech</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div className="clickable-image" onClick={() => handleClick('https://www.facebook.com/pathwise.techmentorship')}>
            <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/448671183_2175533459506506_6869658561464390372_n.png?stp=dst-png_s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rHBd_11U8k4Q7kNvgEajGqN&_nc_ht=scontent-lga3-1.xx&oh=03_Q7cD1QFKp9J1sFt8xp7Uxl_XT5N9GM4BudAvPKY3iiqHp3cLGQ&oe=669D7624" alt="Community 2" className="community-image"/>
            <Text className="image-description">Page về Tech Mentorship</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div className="clickable-image" onClick={() => handleClick('https://www.instagram.com/pathwise.tech/')}>
            <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/448172616_1000109291485538_2251874451951749354_n.png?stp=dst-png_s261x260&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Q0PuHIDkzokQ7kNvgEoaLZ3&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QFiU0hdNPff-BLlWpO_5qRgdxZ6_sFAeY9VaTOsYIvwEw&oe=669D4E83" alt="Community 3" className="community-image" />
            <Text className="image-description">Instagram về Tech</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} className="image-col">
          <div className="clickable-image" onClick={() => handleClick('https://www.instagram.com/pathwise.fin/')}>
            <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/448503792_2806283402868230_2004715015182061013_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DaFx0NM5V9EQ7kNvgGc74c8&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QE07ip3Nf2tgegttJEkeD7fivkq0WQiibbqYZjd-y_KTA&oe=669D6148" alt="Community 4" className="community-image" />
            <Text className="image-description">Instagram về Finance</Text>          
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Community;
