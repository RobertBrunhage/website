import React from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import PlausibleProvider from "next-plausible";
import styles from "../styles/home.module.scss";

import fs from "fs";
import matter from "gray-matter";

const home = ({ videos }) => {
  return (
    <PlausibleProvider domain="robertbrunhage.com">
      <Layout>
        <Head>
          <title>Robert Brunhage - Flutter, Dart, Firebase | Homepage</title>
          <meta
            name="description"
            content="Concise and Practical Training for App Developers | Also Fun... I Promise 😊"
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:url" content="https://robertbrunhage.com" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="RobertBrunhage.com" />
          <meta
            property="og:description"
            content="Concise and Practical Training for App Developers | Also Fun... I Promise 😊"
          />
          <meta property="og:image" content="https://robertbrunhage.com/assets/images/running_avatar.png" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@robertbrunhage" />
          <meta property="twitter:title" content="RobertBrunhage.com" />
          <meta
            property="twitter:description"
            content="Concise and Practical Training for App Developers | Also Fun... I Promise 😊"
          />
          <meta property="twitter:image" content="https://robertbrunhage.com/assets/images/running_avatar.png" />
          <link rel="prefetch" href="https://robertbrunhage.com/videos" />
          <link rel="canonical" href="https://robertbrunhage.com" />
        </Head>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1>Learn Flutter, Firebase & Dart</h1>
            <p>Here you will never be lost, because now you are home 🏡</p>
          </div>
          <div className={styles.featured}>
            <h2>Featured video</h2>
            <div className={styles.card}>
              <img className={styles.preview} src={`https://robertbrunhage.com${videos[0].frontmatter.image}`} alt="video" />
              <p className={styles.title}>{videos[0].frontmatter.title}</p>
              <p className={styles.desc}>{videos[0].frontmatter.description}</p>
              <button>browse</button>
            </div>
          </div>
          <img className={styles.sprite} src="/assets/icons/sprite_talking.png" alt="intro_man" />
        </div>
      </Layout>
    </PlausibleProvider>
  );
};

export default home;

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
    return new Date(a.frontmatter.date) < new Date(b.frontmatter.date) ? 1 : -1;
  });

  return {
    props: {
      videos: sortedVideos,
    },
  };
}
