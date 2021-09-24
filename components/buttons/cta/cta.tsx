import React from "react";
import styles from "./cta.module.scss";

interface CTAProps {
  text: string;
  href: string;
  width: string;
  animation: boolean;
  target?: string;
  center?: boolean;
  opacity?: string;
}

const cta = ({ text, href, width, animation, target, center, opacity }: CTAProps) => {
  return (
    <div style={{ width: width, margin: center ? "0 auto" : "", opacity: opacity }}>
      <a
        className={styles.button}
        href={href}
        target={target}
        style={{
          backgroundColor: animation ? "" : "var(--primary-color)",
        }}
      >
        {text}
      </a>
    </div>
  );
};

export default cta;
