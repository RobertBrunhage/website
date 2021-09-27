import React, { useEffect } from "react";
import styles from "./banner.module.scss";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const path = window.location;
    const nav = document.getElementById("nav");
    const banner = document.getElementById("banner");

    if (path.pathname === "/course") {
      if (nav && banner) {
        nav.style.top = "auto";
        nav.style.marginTop = "0px"; //height of banner
        banner.style.display = "none";
      }
    }
  });

  return (
    <div data-aos="fade-down" id={"banner"} className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p>Less than 1 week left in the special offer!</p>
          <h4>Get my Ultimate Flutter course for 40% off</h4>
        </div>
        <Link href="/course">
          <a>get the pre-launch deal</a>
        </Link>
      </div>
    </div>
  );
};

export default banner;