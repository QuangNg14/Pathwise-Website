"use client";
import React, { useState } from "react";
// import InterviewRoundsSection from "@/components/componentForProgramPage/InterviewRoundsSection/InterviewRoundsSection";
// import OffersSection from "@/components/componentForProgramPage/OffersSection/OffersSection";
import dynamic from "next/dynamic";
import { Layout } from "antd";
import HeaderComponent from "@/components/header/header";
import FooterComponent from "@/components/footer/Footer";
import BatchSuccessSection from "@/components/componentForResultsPage/BatchSuccessSection/BatchSuccessSection";
import TopCompaniesOffersSection from "@/components/componentForResultsPage/TopCompaniesOffersSection/TopCompaniesOffersSection";

// Dynamically import the InterviewRoundsSection component
const InterviewRoundsSection = dynamic(
  () =>
    import(
      "@/components/componentForResultsPage/InterviewRoundsSection/InterviewRoundsSection"
    ),
  { ssr: false }
);

// Dynamically import the InterviewRoundsSection component
const OffersSection = dynamic(
  () =>
    import("@/components/componentForResultsPage/OffersSection/OffersSection"),
  { ssr: false }
);

const Results = () => {
  const [current, setCurrent] = useState("results");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <BatchSuccessSection />
      {/* <TopCompaniesOffersSection /> */}
      <OffersSection />
      {/* <CompanyInterviews /> */}
      <InterviewRoundsSection />
      <FooterComponent />
    </Layout>
  );
};

export default Results;
