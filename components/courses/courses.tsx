import React, { useEffect } from "react";
import styles from "./courses.module.scss";
import CourseCard from "../cards/courseCard/courseCard";

interface CoursesProps {
  courses: Array<any>;
}

const courses = ({ courses }: CoursesProps) => {
  useEffect(() => {
    console.log(courses);
  }, []);

  return (
    <div className={`max_width ${styles.courses_container}`}>
      <h1>Courses</h1>
      <h4 className={styles.subtitle}>
        A more detailed explanation and walkthrough than my videos
      </h4>
      <div className={styles.card_container}>
        {courses.map(({ image, title, description, slug }, index) => (
          <CourseCard
            key={index}
            img={image}
            title={title}
            description={description}
            slug={slug}
            route={"course"}
          />
        ))}
      </div>
    </div>
  );
};

export default courses;
