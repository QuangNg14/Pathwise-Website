import React from "react";
import { Typography, Card } from "antd";

const { Title, Text } = Typography;

const CustomCard = ({ imgSrc, imgAlt, title, description }) => (
  <Card
    style={{ width: 300, borderRadius: "8px", overflow: "hidden", height: 505 }}
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      style={{
        width: "100%",
        height: "180px",
        objectFit: "contain",
        display: "block",
        marginBottom: "16px",
      }}
    />
    <Text
      level={4}
      style={{
        fontWeight: 700,
        marginBottom: "8px",
        fontSize: 30,
        lineHeight: "36.31px",
        display: "block",
      }}
    >
      {title}
    </Text>
    <Text style={{ fontSize: "16px" }}>{description}</Text>
  </Card>
);

export default CustomCard;
