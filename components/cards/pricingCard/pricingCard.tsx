import React from 'react';
import Image from 'next/image';
import styles from './pricingCard.module.scss';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import buttonStyle from '../../buttons/cta/cta.module.scss';
import Stripe from 'stripe';
import { trpc } from '../../../lib/trpc';
import { useRouter } from 'next/router';

import checkmark from "../../../public/assets/icons/checkmark.svg";

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
  modules: Array<any>;
  ownsCourse?: boolean;
}

const PriceHeader: React.FC<{
  price: Stripe.Price[] | undefined;
}> = ({ price }) => {
  if (price && price[0].unit_amount !== null && price[0].unit_amount !== 0) {
    return <h2 className={styles.price}>${price[0].unit_amount / 100}</h2>;
  }

  return <h2 className={styles.price}>$69</h2>;
};

const PricingCard = ({
  className,
  label,
  title,
  price,
  previousPrice,
  price_package,
  supply,
  productId,
  module,
  modules,
  ownsCourse,
}: PricingProps) => {
  const { user } = useUser();
  const { mutateAsync: createCheckoutSession } =
    trpc.stripe.createCheckoutSession.useMutation();
  const { push } = useRouter();

  const handleCheckout = async () => {
    const { checkoutUrl } = await createCheckoutSession({ productId: productId, successPath: `/courses/${module}` });
    if (checkoutUrl) {
      void push(checkoutUrl);
    }
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.package}>
        <div className={styles.label} style={{ display: label ? '' : 'none' }}>
          {label}
        </div>
        <p className={styles.title}>{title}</p>
        <PriceHeader price={price} />
        <h2
          className={styles.prev_price}
          style={{ marginRight: previousPrice && '.5em' }}
        >
          {previousPrice}
        </h2>
        <p className={styles.vat}>VAT may apply</p>
        <ul>
          {price_package.map((item, index) => (
            <li key={index}>
              <div id={styles.check}>
                <Image src={checkmark} alt="checkmark" />
              </div>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.supply}>{supply}</p>
      {ownsCourse ? (
        <div className={styles.owns_course}>
          <span>
            You already own this course!
          </span>
          <Link
            legacyBehavior={true}
            href={`/courses/${module}/${modules[0].slug}`}
          >
            <a className={`${buttonStyle.button} ${styles.btn}`}>
              start watching
            </a>
          </Link>
        </div>
      ) : (
        <div>
          {user ? (
            <button
              onClick={handleCheckout}
              className={`${buttonStyle.button} ${styles.btn}`}
              type="submit"
              role="link"
            >
              Buy
            </button>
          ) : (
            <Link
              legacyBehavior={true}
              href={`/api/auth/login?returnTo=/courses/${module}`}
            >
              <a className={`${buttonStyle.button} ${styles.btn}`}>Buy</a>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingCard;
