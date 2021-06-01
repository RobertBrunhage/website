import React from "react";
import styles from "./emailForm.module.scss";

const EmailForm = ({ color }) => {
  return (
    <div className={styles.email_container}>
      <h3 className={styles.title}>
        Get my <span>free</span> Flutter Tips PDF
      </h3>
      <p className={styles.desc}>Level up your skills by joining 600 other Flutter developers now! 😃</p>
      <form
        action="https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca"
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <input id="email" type="email" placeholder="johndoe@email.com" name="EMAIL" required style={{ backgroundColor: color }} />
        <input id="submit" type="submit" value="LEVEL UP" name="subscribe" />
      </form>
      <p className={styles.giveaway}>When you sign up you are eligible to have a chance to win future courses</p>
    </div>
  );
};

export default EmailForm;
