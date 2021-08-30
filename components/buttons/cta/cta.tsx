import React from "react";
import styles from "./cta.module.scss";

const cta = ({ text, href, width, animation }) => {
  return (
    <div style={{ width: width }}>
      <a
        className={styles.button}
        href={href}
        style={{ backgroundColor: animation ? "" : "var(--primary-color)" }}
      >
        {text}
      </a>
    </div>
  );
};

export default cta;
