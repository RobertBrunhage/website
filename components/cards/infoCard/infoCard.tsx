import React from "react";
import styles from "./infoCard.module.scss";

const infoCard = ({ info, className }) => {
  return (
    <div className={`${styles.infoCard_container} ${className}`}>
      <div className={styles.icon}>
        <img src="assets/icons/checkmark.png" alt="checkmark" />
      </div>
      <p>{info}</p>
    </div>
  );
};

export default infoCard;
