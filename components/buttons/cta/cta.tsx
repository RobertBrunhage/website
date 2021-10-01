import { usePlausible } from "next-plausible";
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
  disabled?: boolean;
  plausibleEvent?: any;
  plausibleEventProp?: any;
}

const cta = ({
  text,
  href,
  width,
  animation,
  target,
  center,
  saturation,
  disabled,
  plausibleEvent,
  plausibleEventProp,
}: CTAProps) => {
  const plausible = usePlausible();

  const onPlausibleEvent = () => {
    if (plausibleEvent) {
      plausible(plausibleEvent, {
        props: {
          type: plausibleEventProp,
        },
      });
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
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        {text}
      </a>
    </div>
  );
};

export default cta;
