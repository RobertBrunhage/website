import React from "react";
import styles from "./moduleCard.module.scss";

const moduleCard = ({ number, title, description }) => {
  return (
    <div className={styles.moduleCard_container}>
      <div className={styles.icon}>{number}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.summary}>{description}</p>
    </div>
  );
};

export default moduleCard;
