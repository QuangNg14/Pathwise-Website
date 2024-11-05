"use client";
import React, { useState } from "react";
// import InterviewRoundsSection from "@/components/componentForActivitiesPage/InterviewRoundsSection/InterviewRoundsSection";
// import OffersSection from "@/components/componentForActivitiesPage/OffersSection/OffersSection";
import dynamic from "next/dynamic";
import { Layout } from "antd";
import CompanyInterviews from "@/components/componentForResultsPage/CompanyInterviews/CompanyInterviews";
import Footer from "@/components/Footer/Footer";
import HeaderComponent from "@/components/header/header";

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
      <OffersSection />
      {/* <CompanyInterviews /> */}
      <InterviewRoundsSection />
      <Footer />
    </Layout>
  );
};

export default Results;
