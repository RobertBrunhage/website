import React from "react";
import Layout from "../components/layout/layout";
import CommonSEO from "../components/seo/seo";
import Courses from "../components/courses/courses";
import { getCoursesFrontMatter } from "../core/mdx";

export type CourseFrontMatterInfo = {
  image: string;
  courseName: string;
  courseId: string;
  title: string;
  description: string;
  previousPrice: number;
  vimeo: number;
  date: string;
  package: { name: string }[];
  course: string;
  slug: string;
};

const courses = ({ courses }: { courses: CourseFrontMatterInfo[] }) => {
  return (
    <Layout>
      <CommonSEO
        title="Robert Brunhage - Flutter, Dart, Firebase | Courses"
        description="Take part of a plethora of courses"
        ogImage="/assets/images/avatar.png"
        twImage="/assets/images/landing_twitter.png"
        ogType="website"
      >
        <link rel="canonical" href="https://robertbrunhage.com" />
      </CommonSEO>
      <Courses courses={courses} />
    </Layout>
  );
};

export default courses;

export async function getStaticProps() {
  const courses: CourseFrontMatterInfo[] = await getCoursesFrontMatter(
    "courses",
  );

  return { props: { courses } };
}
