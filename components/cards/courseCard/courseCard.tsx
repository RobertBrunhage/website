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

const CourseCard = ({
  img,
  title,
  description,
  slug,
  route,
}: CourseCardProps) => {
  return (
    <Link href={`/${route}/${slug}`}>
      <div className={styles.course_card}>
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="thumbnail" />
        }
        <h1>{title}</h1>
        <p className={styles.line_clamp}>{description}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
