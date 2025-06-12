import React from "react";
import Image from "next/image";
import { Typography, Button } from "antd";
import { useRouter } from "next/navigation";
import styles from "./PeerToPeerMentoring.css";

const { Title, Text } = Typography;

const PeerToPeerMentoring = () => {
  const router = useRouter();

  return (
    <section className={styles.container}>
      {/* Intro */}
      <div className={styles.intro}>
        <Title level={1} className={styles.title}>
          Mentoring with Proven Result
        </Title>
        <Text className={styles.description}>
          Get targeted, affordable, and personalized 1-on-1 guidance optimized
          for students applying to jobs at top companies!
        </Text>
        <div className={styles.buttons}>
          <Button
            type="primary"
            size="large"
            className={styles.primaryBtn}
            onClick={() => router.push("/results")}
          >
            View result
          </Button>
          <Button
            type="text"
            size="large"
            className={styles.secondaryBtn}
            onClick={() => router.push("/activities")}
          >
            Mentorship program
          </Button>
        </div>
      </div>

      {/* Hero image */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageCard}>
          <img
            src="https://res.cloudinary.com/dbqcioj2g/image/upload/v1730332025/lwvuognn4fmmqwnrpmdi.jpg"
            alt="Mentoring"
            layout="responsive"
            width={900}
            height={360}
            className={styles.image}
          />
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />
    </section>
  );
};

export default PeerToPeerMentoring;
