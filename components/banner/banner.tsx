import React, { useState, useEffect } from "react";
import styles from "./banner.module.scss";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const banner = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const path = window.location;
    const nav = document.getElementById("nav");
    const banner = document.getElementById("banner");

    if (path.pathname === "/course") {
      if (nav && banner) {
        nav.style.top = "auto";
        nav.style.marginTop = "0px";
        banner.style.display = "none";
      }
    }

    if (!open) {
      nav!.style.marginTop = "0px";
    }
  }, [open]);

  const onClose = () => {
    setOpen((open) => !open);
  };

  return open ? (
    <div data-aos="fade-down" id={"banner"} className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h4>Get my Ultimate Flutter course for 25% off</h4>
        </div>
        <Link href="/course">
          <a>get the pre-launch deal</a>
        </Link>
        <button onClick={() => onClose()}>×</button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default banner;
