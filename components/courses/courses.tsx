import React from "react";
import styles from "./courses.module.scss";
import CourseCard from "../cards/courseCard/courseCard";

const courses = () => {
  return (
    <div className={`max_width ${styles.courses_container}`}>
      <h1>Courses</h1>
      <h4 className={styles.subtitle}>
        A more detailed explanation and walkthrough than my videos
      </h4>
      <div className={styles.card_container}>
        <CourseCard
          img=""
          title="i am a course"
          description="lorem ipsum dolor setum pipsum dipsum lipsum plipsum kiksum tipsum hipsum ripsum lipsum"
        />
        <CourseCard
          img=""
          title="i am also a course"
          description="course number dos"
        />
        <CourseCard
          img=""
          title="this is a course"
          description="i am in fact a course, please consider me"
        />
        <CourseCard
          img=""
          title="hello... its course time"
          description="...course time"
        />
        <CourseCard img="" title="the course" description="the one course" />
      </div>
    </div>
  );
};

export default courses;
