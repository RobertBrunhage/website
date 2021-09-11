import React from "react";
import styles from "./moduleCard.module.scss";

interface ModuleCardProps {
  number: number;
  title: string;
  description: string;
}

const moduleCard = ({ number, title, description }: ModuleCardProps) => {
  return (
    <div className={styles.moduleCard_container}>
      <div className={styles.icon}>{number}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.summary}>{description}</p>
    </div>
  );
};

export default moduleCard;
