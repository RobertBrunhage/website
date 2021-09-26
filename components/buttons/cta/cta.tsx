import React from "react";
import styles from "./cta.module.scss";

interface CTAProps {
  text: string;
  href: string;
  width: string;
  animation: boolean;
  target?: string;
  center?: boolean;
  saturation?: string;
}

const cta = ({
  text,
  href,
  width,
  animation,
  target,
  center,
  saturation,
}: CTAProps) => {
  return (
    <div style={{ width: width, margin: center ? "0 auto" : "" }}>
      <a
        className={styles.button}
        href={href}
        target={target}
        style={{
          backgroundColor: animation ? "" : "var(--primary-color)",
          filter: saturation ? `saturate(${saturation})` : "",
        }}
      >
        {text}
      </a>
    </div>
  );
};

export default cta;
