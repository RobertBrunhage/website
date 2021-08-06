import React from "react";
import styles from "./emailForm.module.scss";

const EmailForm = ({ color, title, description, giveaway, cta, action }) => {
  return (
    <div className={styles.email_container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      <form
        action={action}
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <input
          id="email"
          type="email"
          placeholder="johndoe@email.com"
          name="EMAIL"
          required
          style={{ backgroundColor: color }}
        />
        <input id="submit" type="submit" value={cta} name="subscribe" />
      </form>
      <p className={styles.giveaway}>{giveaway}</p>
    </div>
  );
};

export default EmailForm;
