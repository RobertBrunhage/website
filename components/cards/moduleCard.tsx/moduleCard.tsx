import React from "react";
import styles from "./moduleCard.module.scss";

const moduleCard = () => {
  return (
    <div className={styles.infoCard_container}>
      <div className={styles.icon}>1</div>
      <p className={styles.title}>Module 1: Structure and Building UI</p>
      <p className={styles.summary}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, pariatur magnam. Impedit eum
        aliquam eaque cupiditate dolorum in, deleniti facilis veritatis.
      </p>
    </div>
  );
};

export default moduleCard;
