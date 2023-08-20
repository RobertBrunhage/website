import React from "react";
import styles from "./courses.module.scss";
import CourseCard from "../cards/courseCard/courseCard";
import { CourseFrontMatter } from "../../pages/courses";

const Courses = ({ courses }: { courses: CourseFrontMatter[] }) => {
  return (
    <div className={`max_width ${styles.courses_container}`}>
      <h1>Courses</h1>
      <h4 className={styles.subtitle}>
        A more detailed explanation and walkthrough than my videos
      </h4>
      <div className={styles.card_container}>
        {courses.map(({ image, courseName, description, slug }, index) => (
          <CourseCard
            key={index}
            img={image}
            title={courseName}
            description={description}
            slug={slug}
            route={"courses"}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
