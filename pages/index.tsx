import Layout from "../components/layout/layout";
import Head from "next/head";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Robert Brunhage - Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.app}>
        <div className={styles.app__main}>
          <h1>
            I will <span>soon</span> have flutter courses
            <span role="img" aria-label="hand pointing down emoji">
              👇
            </span>
          </h1>
          <p>
            Future courses will be available here. <br />
            Sign up now to be notified when released
            <span role="img" aria-label="smiling emoji">
              😄
            </span>
          </p>
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
      </div>
    </Layout>
  );
}
