import React from "react";
import styles from "./cta.module.scss";

const cta = ({ text, href, animation }) => {
  return (
    <div>
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
