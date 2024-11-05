"use client";
import AboutUs from "@/components/componentForAboutPage/AboutUs/AboutUs";
import Footer from "@/components/Footer/Footer";
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
      <AboutUs />
      <Footer />
    </Layout>
  );
};

export default About;
