import React from "react";
import styles from "../styles/courses.module.scss";
import Head from "next/head";
import PlausibleProvider from "next-plausible";
import Layout from "../components/layout/layout";
import EmailCourse from "../components/emailForm/forms/emailCourse";
import CTA from "../components/buttons/cta/cta";
import FormInput from "../components/emailForm/formInput";

const courses = () => {
  return (
    <PlausibleProvider domain="robertbrunhage.com">
      <Layout>
        <Head>
          <title>Robert Brunhage - Flutter, Dart, Firebase | Courses</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index" />
          <meta name="description" content="Flutter Courses | Robert Brunhage" />
          <meta property="og:url" content="https://robertbrunhage.com/courses" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="RobertBrunhage.com" />
          <meta property="og:description" content="Flutter Courses" />
          <meta
            property="og:image"
            content="https://robertbrunhage.com/assets/images/course_twitter.png"
          />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@robertbrunhage" />
          <meta property="twitter:title" content="RobertBrunhage.com" />
          <meta property="twitter:description" content="Flutter Courses" />
          <meta
            property="twitter:image"
            content="https://robertbrunhage.com/assets/images/course_twitter.png"
          />
          <link rel="prefetch" href="https://robertbrunhage.com/videos" />
          <link rel="canonical" href="https://robertbrunhage.com" />
        </Head>
        <div className={styles.container}>
          <section className={styles.header}>
            <h1>The Ultimate Flutter Course</h1>
            <h3>Build a complete production ready Flutter application</h3>
            <div className={styles.form}>
              <FormInput
                giveaway={""}
                cta={"get updates"}
                color={"var(--primary-bg-color)"}
                action={
                  "https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca&amp;SIGNUP=FlutterMovieCourse"
                }
              />
            </div>
          </section>
          <section className={`max_width ${styles.introduction}`}>
            <div className={styles.intro_text}>
              <h2>Master Flutter to build production ready apps!</h2>
              <p>
                Have you used Flutter but wanted to take it to the next level? Tired of building
                apps that becomes messy, hard to manage and want a streamlined way of building apps?
                Then this is for you!
              </p>
              <p>
                This is not a course where I will go over how to use the basics such as a Row,
                Column and all that, but instead teach you how to build robust applications from
                scratch.
              </p>
              <p>
                <strong>
                  What I teach in this course is knowledge that I’ve accumulated for more than 3
                  years of Flutter development.
                </strong>
              </p>
              <p>
                Whether you feel like an beginner (as long as you know the basics), intermediate or
                expert this course fasttrack your Flutter journey.
              </p>
              <div className={styles.form}>
                <FormInput
                  giveaway={""}
                  cta={"get updates"}
                  color={"var(--secondary-bg-color)"}
                  action={
                    "https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca&amp;SIGNUP=FlutterMovieCourse"
                  }
                />
              </div>
            </div>
            <ul className={styles.toc}>
              <li>what you get</li>
              <li>lifetime access</li>
              <li>6 modules</li>
              <li>downloadable</li>
              <li>learn advanced concepts</li>
              <li>project you can build upon</li>
            </ul>
          </section>
          <section>
            <div className={`max_width ${styles.about}`}>
              <div>
                <h2>Hey! 👋</h2>
                <p>
                  I’m Robert Brunhage. You may know me by my <strong>YouTube channel</strong> or
                  being a <strong>GDE in Flutter & Dart</strong> but not too long ago I also coded
                  myself in to corners, making code hard to manage and was just lost in how to
                  actually make it scalable.
                </p>
                <p>
                  <strong>I’ve been there but that is also why I know how to get out of it.</strong>{" "}
                  I’ve learned from trial and error, consulting, teaching as well as working with
                  other professionals!
                </p>
                <strong>
                  Save time and frustration and learn an efficient system to build flutter
                  applications
                </strong>
              </div>
              <img
                className={styles.sprite}
                src="/assets/icons/sprite_talking.webp"
                alt="intro_man"
              />
            </div>
          </section>
          <section id={"signup"}>
            <EmailCourse color={"var(--secondary-bg-color)"} />
          </section>
        </div>
      </Layout>
    </PlausibleProvider>
  );
};

export default courses;
