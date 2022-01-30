import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FrontmatterProps } from "../components/blog/blogLayout";
import CTA from "../components/buttons/cta/cta";
import BlogCard from "../components/cards/blogCard/blogCard";
import EmailSignup from "../components/emailForm/forms/emailSignup";
import Layout from "../components/layout/layout";
import { getAllFilesFrontMatter } from "../core/mdx";
import styles from "../styles/home.module.scss";

interface HomeProps {
  videos: Array<FrontmatterProps>;
}

const home = ({ videos }: HomeProps) => {
  const [featuredVideos, setFeaturedVideos] = useState(videos);

  useEffect(() => {
    const featured = videos.filter((video) => {
      return video.featured === true;
    });
    setFeaturedVideos(featured);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Robert Brunhage - Flutter, Dart, Firebase | Homepage</title>
        <meta
          name="description"
          content="Learn how to build production-ready apps with Flutter on mobile, desktop and web."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://robertbrunhage.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Robert Brunhage" />
        <meta
          property="og:description"
          content="Learn how to build production-ready apps with Flutter on mobile, desktop and web."
        />
        <meta
          property="og:image"
          content="https://robertbrunhage.com/assets/images/avatar.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content="Robert Brunhage" />
        <meta
          property="twitter:description"
          content="Learn how to build production-ready apps with Flutter on mobile, desktop and web."
        />
        <meta
          property="twitter:image"
          content="https://robertbrunhage.com/assets/images/landing_twitter.png"
        />
        <link rel="prefetch" href="https://robertbrunhage.com/videos" />
        <link rel="prefetch" href="https://robertbrunhage.com/course" />
        <link rel="canonical" href="https://robertbrunhage.com" />
      </Head>
      <div className={styles.container}>
        <section className={styles.introduction}>
          <div className={`max_width`}>
            <h1>build high quality apps</h1>
            <h3>
              Utilizing tools such as <strong>Flutter and Figma</strong> to do
              it <strong>fast.</strong>
            </h3>
            <div className={styles.btns}>
              <CTA
                text={"course"}
                href={"/course"}
                width={"160px"}
                animation={false}
              />
              <CTA
                text={"free videos"}
                href={"/videos"}
                width={"160px"}
                animation={true}
              />
            </div>
            <Link href="/course">
              <img
                className={styles.sprite}
                src="/assets/images/flutter_course_launch_hero.png"
                alt="intro_man"
              />
            </Link>
          </div>

          <div
            className={styles.spacer}
            style={{ backgroundImage: `url('./assets/images/wave.svg')` }}
          />
        </section>

        <section className={styles.puffs}>
          <div className={`max_width ${styles.content}`}>
            <div className={styles.card}>
              <img src="/assets/icons/discord.png" alt="discord icon" />
              <h3>Discord Community</h3>
              <p>
                We have a{" "}
                <a href="https://discord.gg/HktybpYREU" target="_blank">
                  discord
                </a>{" "}
                channel where you can chat and learn with other developers.
              </p>
            </div>
            <div className={styles.card}>
              <img src="/assets/icons/open_source.png" alt="open source icon" />
              <h3>Open Source</h3>
              <p>
                My videos are almost all supported by a GitHub repo, this{" "}
                <a>site</a> as well.
              </p>
            </div>
            <div className={styles.card}>
              <img
                src="/assets/icons/education.png"
                alt="books education icon"
              />
              <h3>High Quality</h3>
              <p>
                My main focus is to provide very high quality content wether
                free or paid.
              </p>
            </div>
          </div>
          <div className={styles.newsletter}>
            <EmailSignup color={"var(--secondary-bg-color)"} />
          </div>
        </section>

        <section className={styles.testimonial}>
          <div className={`max_width ${styles.content}`}>
            <h2 className={styles.title}>The Developers</h2>
            <div className={styles.testimonials}>
              <img
                src="/assets/images/testimonials/mikerydstrom.png"
                alt="mike rydstrom"
              />
              <img
                src="/assets/images/testimonials/aymanbarghout.png"
                alt="ayman barghout"
              />
              <img
                src="/assets/images/testimonials/tadaspetra.png"
                alt="tadas petra"
              />
              <img
                src="/assets/images/testimonials/mukaldadwhal.png"
                alt="mukal dadwhal"
              />
              <img
                src="/assets/images/testimonials/luischodiman.png"
                alt="luis chodiman"
              />
            </div>
          </div>
        </section>

        <section>
          <div className={"max_width"}>
            <h2 className={styles.ft}>Featured Tutorials</h2>
            <div className={styles.card_container}>
              {featuredVideos
                .slice(0, 3)
                .map(({ title, description, image, slug }) => (
                  <BlogCard
                    key={slug}
                    slug={slug}
                    title={title}
                    description={description}
                    image={image}
                  />
                ))}
            </div>
          </div>
          <div className={styles.newsletter}>
            <EmailSignup color={"var(--secondary-bg-color)"} />
          </div>
        </section>

        <section className={styles.about_me}>
          <div className={`max_width ${styles.content}`}>
            <h2 className={styles.title}>About Me</h2>
            <div className={styles.desc}>
              <h2>Hey!👋</h2>
              <p>
                I’m Robert Brunhage. You may know me by my{" "}
                <strong>
                  <a
                    href="https://www.youtube.com/c/RobertBrunhage"
                    target="_blank"
                  >
                    YouTube channel
                  </a>
                </strong>{" "}
                or being a <strong>GDE in Flutter & Dart.</strong>
              </p>
              <p>
                I started because I believed there were topics that could be
                explained <strong>better</strong>, so I did my best to do just
                that!
              </p>
            </div>
            <img
              className={styles.sprite}
              src="/assets/icons/sprite_fire.png"
              alt="amazed"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default home;

export async function getStaticProps() {
  const videos = await getAllFilesFrontMatter("lessons");

  return { props: { videos } };
}
