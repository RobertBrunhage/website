import React from "react";
import CTA from "../../buttons/cta/cta";
import styles from "./pricingCard.module.scss";
import { eventPropCourse, eventSignup } from "../../../core/constants";

interface Packages {
  name: string;
}

interface PricingProps {
  className?: string;
  label?: string;
  title: string;
  price: string;
  discounted_price?: string;
  price_package: Array<Packages>;
  href?: string;
  saturation?: string;
  supply?: string;
  disabled?: boolean;
}

const pricingCard = ({
  className,
  label,
  title,
  price,
  discounted_price,
  price_package,
  href,
  saturation,
  supply,
  disabled,
}: PricingProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.package}>
        <div className={styles.label} style={{ display: label ? "" : "none" }}>
          {label}
        </div>
        <p className={styles.title}>{title}</p>
        <h2 className={styles.price}>{price}</h2>
        <h2 className={styles.discounted_price}>{discounted_price}</h2>
        <p className={styles.vat}>VAT may apply</p>
        <ul>
          {price_package.map((item, index) => (
            <li key={index}>
              <div id={styles.check}>
                <img src="/assets/icons/checkmark.svg" alt="checkmark" />
              </div>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.supply}>{supply}</p>
      <CTA
        text="enroll"
        href={href ?? "#"}
        target={"_blank"}
        width={"auto"}
        animation={false}
        saturation={saturation}
        plausibleEvent={eventSignup}
        plausibleEventProp={eventPropCourse}
        disabled={disabled}
        isPurchase={true}
      />
    </div>
  );
};

export default pricingCard;
