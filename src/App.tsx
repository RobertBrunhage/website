import React from "react";
import styles from "./App.module.scss";
import helperStyles from "./Helper.module.scss";

import discord from "./assets/icons/socials/discord.svg";
import twitter from "./assets/icons/socials/twitter.svg";
import patreon from "./assets/icons/socials/patreon.svg";
import youtube from "./assets/icons/socials/youtube.svg";

const socials = [
  { src: twitter, link: "https://twitter.com/RobertBrunhage", alt: "twitter" },
  { src: discord, link: "https://discord.gg/guJ2Q4D", alt: "discord" },
  { src: youtube, link: "http://bit.ly/2SUyRhx", alt: "youtube" },
  { src: patreon, link: "https://www.patreon.com/join/RobertBrunhage", alt: "patreon" },
];

const cards = [
  { name: "Videos", desc: "Coming soon!" },
  { name: "Courses", desc: "Coming soon!" },
];

function App() {
  return (
    <div className={`${styles.app} ${helperStyles.maxWidth}`}>
      <div className={styles.app__main}>
        <h1>
          I will <span>soon</span> have courses{" "}
          <span role="img" aria-label="hand pointing down emoji">
            👇
          </span>
        </h1>
        <p>
          Future courses will be available here. Sign up now to be notified when released
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
      <div className={styles.app__cards}>
        {cards.map((i) => [
          <div className={styles.app__card} key={i.name}>
            <h1>{i.name}</h1>
            <p>{i.desc}</p>
          </div>,
        ])}
      </div>
      <div className={styles.app__socials}>
        {socials.map((i) => [
          <a href={i.link} target="_blank" rel="noopener noreferrer" key={i.alt}>
            <img src={i.src} alt={i.alt} />
          </a>,
        ])}
      </div>
    </div>
  );
}

export default App;
