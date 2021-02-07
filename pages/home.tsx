import React from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import PlausibleProvider from "next-plausible";
import styles from "../styles/home.module.scss";

const home = () => {
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
          <meta property="twitter:image" content="https://robertbrunhage.com/assets/images/avatar.png" />
          <link rel="prefetch" href="https://robertbrunhage.com/videos" />
          <link rel="canonical" href="https://robertbrunhage.com" />
        </Head>
        {/*         <div className={styles.app}>
          <div className={styles.app__main}>
            <h1>
              I will <span>soon</span> have flutter courses
              <span role="img" aria-label="hand pointing down emoji">
                👇
              </span>
            </h1>
            <h3>
              Future courses will be available here. <br />
              Sign up now to be notified when released
              <span role="img" aria-label="smiling emoji">
                😄
              </span>
            </h3>
            <form
              action="https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca"
              method="post"
              name="mc-embedded-subscribe-form"
              target="_blank"
              noValidate
            >
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="johndoe@email.com" name="EMAIL" required />
              <input id="submit" type="submit" value="Notify me" name="subscribe" />
              <span>
                When you sign up you are eligible to have a chance to win future courses
                <span role="img" aria-label="gift emoji">
                  🎁
                </span>
              </span>
            </form>
          </div>
        </div> */}
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1>Learn Flutter, Firebase & Dart</h1>
            <p>Here you will never be lost, because now you are home 🏡</p>
          </div>
          <div className={styles.featured}>
            <h2>Featured Video</h2>
            <div>
              video title desc browse
              {/* <h1>{videos[0].frontmatter.title}</h1> */}
            </div>
          </div>
          <img src="/assets/icons/sprite_talking.png" alt="intro_man" />
        </div>
      </Layout>
    </PlausibleProvider>
  );
};

export default home;
