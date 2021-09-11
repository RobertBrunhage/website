import React from "react";
import styles from "./cta.module.scss";

interface CTAProps {
  text: string;
  href: string;
  width: string;
  animation: boolean;
}

const cta = ({ text, href, width, animation }: CTAProps) => {
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
