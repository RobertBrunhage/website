import React from "react";
import styles from "./moduleCard.module.scss";

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
}

const moduleCard = ({ number, title, description }: ModuleCardProps) => {
  return (
    <div className={styles.moduleCard_container}>
      <div className={styles.icon}>{number}</div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.summary}>{description}</p>
    </div>
  );
};

export default moduleCard;
