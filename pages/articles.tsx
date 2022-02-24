import Head from "next/head";
import React from "react";
import BlogLayout from "../components/blog/blogLayout";
import Layout from "../components/layout/layout";
import CommonSEO from "../components/seo/seo";
import { getAllFilesFrontMatter } from "../core/mdx";

const articles = ({ articles }: any) => {
  return (
    <Layout>
      <CommonSEO
        title="Robert Brunhage - Flutter, Dart, Firebase | articles"
        description="Video lesson on topics such as Flutter, Dart, Firebase and more | Robert Brunhage"
        ogImage={articles[0].image}
        twImage={articles[0].image}
        ogType="website"
        subroute="/articles"
      >
        <link rel="canonical" href="https://robertbrunhage.com/articles" />
      </CommonSEO>
      <BlogLayout
        posts={articles}
        title={"Articles"}
        description="Articles regarding topics such as Flutter, Dart, Git and more!"
        route="articles"
      ></BlogLayout>
    </Layout>
  );
};

export default articles;

export async function getStaticProps() {
  const articles = await getAllFilesFrontMatter("articles");

  return { props: { articles } };
}
