"use client";
import HeroSection from "@/components/componentForProgramPage/HeroSection/HeroSection";
import ImpactSection from "@/components/componentForProgramPage/ImpactSection/ImpactSection";
import Timeline from "@/components/componentForProgramPage/Timeline/Timeline";
import FooterComponent from "@/components/footer/Footer";
import HeaderComponent from "@/components/header/header";
import { Layout } from "antd";
import React, { useState } from "react";

const Program = () => {
  const [current, setCurrent] = useState("program");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <HeroSection />
      <Timeline />
      <ImpactSection />
      <FooterComponent />
    </Layout>
  );
};

export default Program;
