import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./banner.module.scss";
import { default as Cookie, default as Cookies } from "universal-cookie";

const banner = () => {
  const [open, setOpen] = useState(true);
  const cookie = new Cookie();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const path = window.location;
    const nav = document.getElementById("nav");
    const banner = document.getElementById("banner");

    if (path.pathname === "/course" || path.pathname === "/cookie_policy") {
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
    cookie.set("banner_close", true, { maxAge: 172800 });
  };

  return open && !cookie.get("banner_close") ? (
    <div data-aos="fade-down" id={"banner"} className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h4>The Ultimate Flutter Course is fully released!</h4>
        </div>
        <Link href="/course">
          <a>Learn More</a>
        </Link>
        <button onClick={() => onClose()}>×</button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default banner;
