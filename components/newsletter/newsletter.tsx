import React from "react";
import EmailForm from "../emailForm/emailForm";
import styles from "./newsletter.module.scss";

interface NewsletterProps {
  color: any;
  title: string;
  description: string;
  cta: string;
  giveaway: string;
  action: string;
  img: string;
  plausibleEvent: string;
  plausibleEventProp: string;
}

const newsletter = ({
  color,
  title,
  description,
  giveaway,
  action,
  cta,
  img,
  plausibleEvent,
  plausibleEventProp,
}: NewsletterProps) => {
  return (
    <div className={`max_width ${styles.newsletter_container}`}>
      <img className={styles.sprite} src={img} alt="sprite nervous" />
      <div className={styles.form}>
        <EmailForm
          color={color}
          title={title}
          description={description}
          giveaway={giveaway}
          action={action}
          cta={cta}
          plausibleEvent={plausibleEvent}
          plausibleEventProp={plausibleEventProp}
        />
      </div>
    </div>
  );
};

export default newsletter;
