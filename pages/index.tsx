import React from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import PlausibleProvider from "next-plausible";
import styles from "../styles/home.module.scss";
import EmailList from "../components/emailForm/forms/emailList";

import fs from "fs";
import matter from "gray-matter";
import CTA from "../components/buttons/cta/cta";

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
          <meta property="og:image" content="https://robertbrunhage.com/assets/images/avatar.png" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@robertbrunhage" />
          <meta property="twitter:title" content="RobertBrunhage.com" />
          <meta
            property="twitter:description"
            content="Concise and Practical Training for App Developers | Also Fun... I Promise 😊"
          />
          <meta
            property="twitter:image"
            content="https://robertbrunhage.com/assets/images/avatar.png"
          />
          <link rel="prefetch" href="https://robertbrunhage.com/videos" />
          <link rel="canonical" href="https://robertbrunhage.com" />
        </Head>
        <div className={styles.container}>
          <section className={styles.introduction}>
            <div className={`max_width ${styles.content}`}>
              <div className={styles.intro}>
                <h1>Learn Flutter, Firebase & Dart</h1>
                <p>Here you will never be lost, because now you are home 🏡</p>
              </div>
              <div className={styles.featured}>
                <h2>Featured video</h2>
                <div className={styles.card}>
                  <img
                    className={styles.preview}
                    src={`https://robertbrunhage.com${videos[0].frontmatter.image}`}
                    alt="video"
                  />
                  <p className={styles.title}>{videos[0].frontmatter.title}</p>
                  <p className={styles.desc}>{videos[0].frontmatter.description}</p>
                  <CTA text={"browse"} href={"/videos"} animation={true} />
                </div>
              </div>
              <img
                className={styles.sprite}
                src="/assets/icons/sprite_talking.webp"
                alt="intro_man"
              />
            </div>
          </section>
          <section className={styles.newsletter}>
            <EmailList color={"var(--primary-bg-color)"} />
          </section>
          <section className={styles.puffs}>
            <div className={`max_width ${styles.content}`}>
              <div className={styles.card}>
                <img src="/assets/icons/discord.png" alt="discord icon" />
                <h3>Discord Community</h3>
                <p>
                  We have a <a>discord</a> channel where you can chat and learn with other
                  developers.
                </p>
              </div>
              <div className={styles.card}>
                <img src="/assets/icons/open_source.png" alt="open source icon" />
                <h3>Open Source</h3>
                <p>
                  My videos are almost all supported by a GitHub repo, this <a>site</a> as well.
                </p>
              </div>
              <div className={styles.card}>
                <img src="/assets/icons/education.png" alt="books education icon" />
                <h3>Education for free</h3>
                <p>The goal is to have enough content out for free so anyone can start learning.</p>
              </div>
            </div>
          </section>
          <section className={styles.testimonial}>
            <div className={`max_width ${styles.content}`}>
              <h2 className={styles.title}>The Developers</h2>
              <div className={styles.testimonials}>
                <img src="/assets/images/testimonials/mikerydstrom.png" alt="mike rydstrom" />
                <img src="/assets/images/testimonials/aymanbarghout.png" alt="ayman barghout" />
                <img src="/assets/images/testimonials/tadaspetra.png" alt="tadas petra" />
                <img src="/assets/images/testimonials/mukaldadwhal.png" alt="mukal dadwhal" />
                <img src="/assets/images/testimonials/luischodiman.png" alt="luis chodiman" />
              </div>
            </div>
          </section>
          <section
            className={styles.newsletter}
            style={{ backgroundColor: "var(--primary-bg-color)" }}
          >
            <EmailList color={"var(--secondary-bg-color)"} />
          </section>
          <section className={styles.about_me}>
            <div className={`max_width ${styles.content}`}>
              <h2 className={styles.title}>About Me</h2>
              <p className={styles.desc}>
                Hi! My name is <span>Robert Brunhage</span> a GDE in Flutter and Dart. My mission is
                to make learning app development <span>easy, fun and engaging</span>.
              </p>
              <img
                className={styles.sprite}
                src="/assets/icons/sprite_talking_2.webp"
                alt="sprite nervous"
              />
            </div>
          </section>
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
