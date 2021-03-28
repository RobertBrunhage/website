import React from "react";
import styles from "./emailForm.module.scss";

const EmailForm = ({}) => {
  return (
    <div className={styles.email_container}>
      <h3 className={styles.title}>
        Courses coming <span>soon</span>
      </h3>
      <p className={styles.desc}>They will be available here. Sign up now to be notified when they are released 😃</p>
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
      <p className={styles.giveaway}>When you sign up you are eligible to have a chance to win future courses</p>
    </div>
  );
};

export default EmailForm;
