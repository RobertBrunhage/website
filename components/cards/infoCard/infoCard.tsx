import React from "react";
import styles from "./infoCard.module.scss";

const infoCard = () => {
  return (
    <div className={styles.infoCard_container}>
      <div className={styles.icon}>
        <img src="assets/icons/checkmark.png" alt="checkmark" />
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur.
      </p>
    </div>
  );
};

export default infoCard;
