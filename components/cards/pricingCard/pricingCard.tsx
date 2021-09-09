import React from "react";
import CTA from "../../buttons/cta/cta";
import styles from "./pricingCard.module.scss";

interface Packages {
  name: string;
}

interface PricingProps {
  className?: string;
  label?: string;
  title: string;
  price: string;
  discounted_price: string;
  price_package: Array<Packages>;
}

const pricingCard = ({
  className,
  label,
  title,
  price,
  discounted_price,
  price_package,
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
        <ul>
          {price_package.map((item) => (
            <li>
              <div id={styles.check}>
                <img src="/assets/icons/checkmark.svg" alt="checkmark" />
              </div>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <CTA text="buy now" href="#" width={"auto"} animation={false} />
    </div>
  );
};

export default pricingCard;