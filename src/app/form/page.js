"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import HeaderComponent from "@/components/header/header";
import FooterComponent from "@/components/footer/Footer";
import FormSection from "@/components/componentForFormPage/FormSection/FormSection";

const FormPage = () => {
  const [current, setCurrent] = useState("form");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <FormSection />
      <FooterComponent />
    </Layout>
  );
};

export default FormPage;
