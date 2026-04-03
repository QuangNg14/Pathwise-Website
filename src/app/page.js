"use client";
import { Layout, Row, Col, Typography, Button } from "antd";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/header/header";
import LandYourDreamJob from "@/components/componentForMainPage/LandYourDreamJob/LandYourDreamJob";
import Features from "@/components/componentForMainPage/Features/Features";
import AchievementGallery from "@/components/componentForMainPage/AchievementGallery/AchievementGallery";
import MenteeShowcase from "@/components/componentForMainPage/MenteeShowcase/MenteeShowcase";
import PeerToPeerMentoring from "@/components/componentForMainPage/PeerToPeerMentoring/PeerToPeerMentoring";
import Community from "@/components/componentForMainPage/Community/Community";
import FAQ from "@/components/componentForMainPage/FAQ/FAQ";
import FooterComponent from "@/components/footer/Footer";
import MentorshipApplication from "@/components/componentForMainPage/MentorshipApplication/MentorshipApplication";
import ChatBot from "@/components/ChatBot/ChatBot";

const { Header, Content } = Layout;
const { Title, Text } = Typography;



export default function Home() {
  const [current, setCurrent] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // Ensure CSS is loaded before rendering
  useEffect(() => {
    // Small delay to ensure CSS is loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // smooth-scroll to #application on load or hash change
  useEffect(() => {
    if (!isLoaded) return;
    const scrollToHash = (hash) => {
      if (!hash) return;
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // small offset if you have a sticky header
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // on initial load
    scrollToHash(window.location.hash);

    // if you ever change hash client-side
    const handleHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isLoaded]);

  // Show loading state briefly to prevent FOUC
  if (!isLoaded) {
    return (
      <Layout style={{ minHeight: "100vh", background: "var(--color-background)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "var(--color-background)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--color-border)",
              borderTop: "3px solid var(--color-primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <Content>
        <div className="site-layout-content">
          <PeerToPeerMentoring />
          <Features />
          <LandYourDreamJob />
          <MenteeShowcase />
          {/* <AchievementGallery />
          <Community /> */}
          <FAQ />
          <MentorshipApplication />
          <FooterComponent />
        </div>
      </Content>
      <ChatBot />
    </Layout>
  );
}
