import React from "react";
import Layout from "../components/layout/layout";
import CommonSEO from "../components/seo/seo";
import Courses from "../components/courses/courses";

const courses = () => {
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
      <Courses />
    </Layout>
  );
};

export default courses;
