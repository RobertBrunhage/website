import React from "react";
import styles from "./cta.module.scss";
import { usePlausible } from "next-plausible";

interface CTAProps {
  text: string;
  href: string;
  width: string;
  animation: boolean;
  target?: string;
  center?: boolean;
  saturation?: string;
  plausibleEvent?: any;
}

const cta = ({
  text,
  href,
  width,
  animation,
  target,
  center,
  saturation,
  plausibleEvent,
}: CTAProps) => {
  const plausible = usePlausible();

  const onPlausibleEvent = () => {
    if (plausibleEvent) {
      plausible(plausibleEvent);
    }
  };

  return (
    <div style={{ width: width, margin: center ? "0 auto" : "" }}>
      <a
        className={styles.button}
        href={href}
        target={target}
        onClick={() => onPlausibleEvent()}
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
