import { usePlausible } from "next-plausible";
import React from "react";
import { getCookieConsentValue } from "react-cookie-consent";
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
  isPurchase?: boolean;
}

const Cta = ({
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
  isPurchase,
}: CTAProps) => {
  const plausible = usePlausible();
  const cookieStatus = getCookieConsentValue();

  const onPlausibleEvent = () => {
    if(isPurchase) {
      if (cookieStatus === "true") {
        import("react-facebook-pixel")
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`);
            ReactPixel.track('Purchase');
          });
      }
    }
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

export default Cta;
