"use client";
import FooterComponent from "@/components/footer/Footer";
import HeaderComponent from "@/components/header/header";
import { Layout } from "antd";
import React from "react";
import { useState } from "react";

const About = () => {
  const [current, setCurrent] = useState("about");

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <div style={{ padding: "100px 24px", textAlign: "center" }}>
        <h1>About page is temporarily hidden</h1>
        <p>The About section is currently not exposed.</p>
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default About;
