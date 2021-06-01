import React from "react";
import EmailForm from "../emailForm/emailForm";
import styles from "./newsletter.module.scss";

const newsletter = ({ color }) => {
  return (
    <div className={`max_width ${styles.newsletter_container}`}>
      <img className={styles.sprite} src="/assets/icons/sprite_amazed.webp" alt="sprite nervous" />
      <div className={styles.form}>
        <EmailForm color={color} />
      </div>
    </div>
  );
};

export default newsletter;
