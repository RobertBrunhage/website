import React from "react";
import EmailForm from "../emailForm/emailForm";
import styles from "./newsletter.module.scss";

const newsletter = ({ color, title, description, giveaway, action, cta, img, plausibleEvent }) => {
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
        />
      </div>
    </div>
  );
};

export default newsletter;
