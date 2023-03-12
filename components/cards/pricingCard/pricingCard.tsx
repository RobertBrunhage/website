import React from "react";
import styles from "./pricingCard.module.scss";
import Link from "next/link";
import { eventPropCourse, eventSignup } from "../../../core/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import buttonStyle from "../../buttons/cta/cta.module.scss";
import Stripe from "stripe";

export interface Packages {
  name: string;
}

interface PricingProps {
  className?: string;
  label?: string;
  title: string;
  price: Stripe.Price[] | undefined;
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

const PriceHeader: React.FC<{
  price: Stripe.Price[] | undefined;
}> = ({ price }) => {
  if (price && price[0].unit_amount !== null && price[0].unit_amount !== 0) {
    return <h2 className={styles.price}>${price[0].unit_amount / 100}</h2>;
  }

  return <h2 className={styles.price}>$69</h2>;
};

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
        <PriceHeader price={price} />
        <h2
          className={styles.prev_price}
          style={{ marginRight: previousPrice && ".5em" }}
        >
          {previousPrice}
        </h2>
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
          action={`/api/checkout_sessions/?productId=${productId}&successPath=/courses/${module}`}
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
          href={`/api/auth/login?returnTo=/courses/${module}`}
        >
          <a className={`${buttonStyle.button} ${styles.btn}`}>Buy</a>
        </Link>
      )}
    </div>
  );
};

export default pricingCard;
