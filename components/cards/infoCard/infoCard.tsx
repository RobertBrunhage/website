import React from "react";
import styles from "./infoCard.module.scss";

interface InfoCardProps {
  info: string;
}

const infoCard = ({ info }: InfoCardProps) => {
  return (
    <div className={styles.infoCard_container}>
      <div className={styles.icon}>
        <img src="assets/icons/checkmark.png" alt="checkmark" />
      </div>
      <p>{info}</p>
    </div>
  );
};

export default infoCard;
