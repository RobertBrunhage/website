import React from "react";
import styles from "./emailForm.module.scss";
import FormInput from "./formInput";

const EmailForm = ({ color, title, description, giveaway, cta, action, plausibleEvent }) => {
  return (
    <div className={styles.email_container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      <FormInput
        action={action}
        color={color}
        cta={cta}
        giveaway={giveaway}
        plausibleEvent={plausibleEvent}
      />
    </div>
  );
};

export default EmailForm;
