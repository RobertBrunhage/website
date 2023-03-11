import React, { ReactNode } from "react";
import styles from "./pricingCard.module.scss";
import Link from "next/link";
import { eventPropCourse, eventSignup } from "../../../core/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import buttonStyle from "../../buttons/cta/cta.module.scss";

export interface Packages {
  name: string;
}

interface PricingProps {
  className?: string;
  label?: string;
  title: string;
  price: string;
  previousPrice?: string;
  discounted_price?: string;
  price_package: Array<Packages>;
  href?: string;
  saturation?: string;
  supply?: string;
  disabled?: boolean;
  productId: string;
  module: string;
}

const pricingCard = ({
  className,
  label,
  title,
  price,
  previousPrice,
  price_package,
  href,
  saturation,
  supply,
  disabled,
  productId,
  module,
}: PricingProps) => {
  const { user } = useUser();
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.package}>
        <div className={styles.label} style={{ display: label ? "" : "none" }}>
          {label}
        </div>
        <p className={styles.title}>{title}</p>
        <h2 className={styles.price}>{price}</h2>
        <h2 className={styles.prev_price}>{previousPrice}</h2>
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
      {user ? (
        <form
          action={`/api/checkout_sessions/?productId=${productId}&successPath=/course/${module}`}
          method="POST"
        >
          <button
            className={`${buttonStyle.button} ${styles.btn}`}
            type="submit"
            role="link"
          >
            Buy
          </button>
        </form>
      ) : (
        <Link
          legacyBehavior={true}
          href={`/api/auth/login?returnTo=/course/${module}`}
        >
          <a className={`${buttonStyle.button} ${styles.btn}`}>Buy</a>
        </Link>
      )}
    </div>
  );
};

export default pricingCard;
