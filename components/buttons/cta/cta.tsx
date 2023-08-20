import { usePlausible } from "next-plausible";
import Link from "next/link";
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
  plausibleEvent,
  plausibleEventProp,
  isPurchase,
}: CTAProps) => {
  const plausible = usePlausible();
  const cookieStatus = getCookieConsentValue();

  const onPlausibleEvent = () => {
    if (isPurchase) {
      if (cookieStatus === "true") {
        import("react-facebook-pixel")
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`);
            ReactPixel.track("Purchase");
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

  if (animation)
    return (
      <div style={{ width: width }}>
        <Link
          className={styles.button}
          href={href}
          target={target}
          onClick={() => onPlausibleEvent()}
        >
          {text}
        </Link>
      </div>
    );

  return (
    <div style={{ width: width }}>
      <Link
        className={styles.button}
        href={href}
        target={target}
        onClick={() => onPlausibleEvent()}
        style={{
          backgroundColor: "var(--primary-color)",
        }}
      >
        {text}
      </Link>
    </div>
  );
};

export default Cta;
