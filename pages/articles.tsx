import Head from "next/head";
import React from "react";
import BlogLayout from "../components/blog/blogLayout";
import Layout from "../components/layout/layout";
import { getAllFilesFrontMatter } from "../core/mdx";

const articles = ({ articles }: any) => {
  return (
    <Layout>
      <Head>
        <title>Robert Brunhage - Flutter, Dart, Firebase | articles</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index" />
        <meta
          name="description"
          content="Video lesson on topics such as Flutter, Dart, Firebase and more | Robert Brunhage"
        />
        <meta property="og:url" content="https://robertbrunhage.com/articles" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={articles[0].title} />
        <meta property="og:description" content={articles[0].description} />
        <meta property="og:image" content={articles[0].image} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content={articles[0].title} />
        <meta
          property="twitter:description"
          content={articles[0].description}
        />
        <meta
          property="twitter:image"
          content={`https://robertbrunhage.com${articles[0].image}`}
        />
        <link rel="canonical" href="https://robertbrunhage.com/articles" />
      </Head>
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
