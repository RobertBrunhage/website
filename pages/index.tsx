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
          <div className={styles.section_one}>
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
                  <button>browse</button>
                </div>
              </div>
              <img className={styles.sprite} src="/assets/icons/sprite_talking.png" alt="intro_man" />
            </div>
          </div>
          <div className={styles.section_two}>
            <div className={`max_width ${styles.content}`}>
              <div className={styles.card}>
                <img src="" alt="discord icon" />
                <h3>Discord Community</h3>
                <p>
                  We have a <a>discord</a> channel where you can chat and learn with other developers.
                </p>
              </div>
              <div className={styles.card}>
                <img src="" alt="open source icon" />
                <h3>Open Source</h3>
                <p>
                  My videos are almost all supported by a GitHub repo, this <a>site</a> as well.
                </p>
              </div>
              <div className={styles.card}>
                <img src="" alt="books education icon" />
                <h3>Education for free</h3>
                <p>The goal is to have enough content out for free so anyone can start learning.</p>
              </div>
            </div>
          </div>
          <div className={styles.section_three}>
            <div className={`max_width ${styles.content}`}>
              <h2>The Developers</h2>
              <div className={styles.testimonials}>
                <img src="/assets/images/testimonials/mikerydstrom.png" alt="mike rydstrom" />
                <img src="/assets/images/testimonials/aymanbarghout.png" alt="ayman barghout" />
                <img src="/assets/images/testimonials/tadaspetra.png" alt="tadas petra" />
                <img src="/assets/images/testimonials/mukaldadwhal.png" alt="mukal dadwhal" />
                <img src="/assets/images/testimonials/luischodiman.png" alt="luis chodiman" />
              </div>
            </div>
          </div>
          <div className={styles.section_four}>
            <div className={`max_width ${styles.content}`}>
              <img className={styles.sprite} src="/assets/icons/sprite_nervous.png" alt="sprite nervous" />
              <h3 className={styles.title}>
                Courses coming <span>soon</span>
              </h3>
              <p className={styles.desc}>
                They will be available here. Sign up now to be notified when they are released 😃
              </p>
              <form
                action="https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca"
                method="post"
                name="mc-embedded-subscribe-form"
                target="_blank"
                noValidate
              >
                <input id="email" type="email" placeholder="johndoe@email.com" name="EMAIL" required />
                <input id="submit" type="submit" value="Notify me" name="subscribe" />
              </form>
              <p className={styles.giveaway}>
                When you sign up you are eligible to have a chance to win future courses
              </p>
            </div>
          </div>
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
