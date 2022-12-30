import React from "react";
import styles from "./courseCard.module.scss";
import Link from "next/link";

interface CourseCardProps {
  img: string;
  title: string;
  description: string;
  slug: string;
  route: string;
}

const courseCard = ({ img, title, description, slug, route }: CourseCardProps) => {
  return (
    <Link href={`/${route}/[slug]/module-1-overview/`} as={`/${route}/${slug}/module-1-overview/`}>
      <div className={styles.course_card}>
        <img src={img} alt="thumbnail" />
        <h1>{title}</h1>
        <p className={styles.line_clamp}>{description}</p>
      </div>
    </Link>
  );
};

export default courseCard;
