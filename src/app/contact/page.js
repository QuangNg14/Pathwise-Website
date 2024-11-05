"use client";
import ContactSection from "@/components/componentForContactPage/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import HeaderComponent from "@/components/header/header";
import { Layout } from "antd";
import React from "react";
import { useState } from "react";

const Contact = () => {
  const [current, setCurrent] = useState("contact");

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <ContactSection />
      <Footer />
    </Layout>
  );
};

export default Contact;
