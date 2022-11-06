import React from "react";
import styles from "./courseCard.module.scss";

interface CourseCardProps {
  img: string;
  title: string;
  description: string;
}

const courseCard = ({ img, title, description }: CourseCardProps) => {
  return (
    <div className={styles.course_card}>
      <img src={img} alt="thumbnail" />
      <h1>{title}</h1>
      <p className={styles.line_clamp}>{description}</p>
    </div>
  );
};

export default courseCard;
