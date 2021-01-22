import Head from "next/head";
import React from "react";
import Layout from "../components/layout/layout";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import styles from "../styles/videos.module.scss";

const videos = ({ videos }) => {
  return (
    <Layout>
      <Head>
        <title>Robert Brunhage - Videos</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className={styles.title}>Video Lessons :)</h1>
      <div className={styles.card_container}>
        {videos.map(({ frontmatter: { title, description, image }, slug }) => (
          <Link href={"/videos/[slug]"} as={`/videos/${slug}`} key={title}>
            <div className={styles.video_card}>
              <img src={image} alt="thumbnail" />
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default videos;

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content/lessons`);

  const videos = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(`content/lessons/${filename}`).toString();

    const { data } = matter(markdownWithMetadata);

    const frontmatter = {
      ...data,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  const sortedVideos = videos.sort((a, b) => {
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
  });

  return {
    props: {
      videos: sortedVideos,
    },
  };
}
