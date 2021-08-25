import React from "react";
import styles from "./formInput.module.scss";
import { usePlausible } from "next-plausible";

const formInput = ({ action, color, cta, giveaway, plausibleEvent }) => {
  const plausible = usePlausible();

  return (
    <div className={styles.form}>
      <form
        action={action}
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <input
          id="email"
          type="email"
          placeholder="johndoe@email.com"
          name="EMAIL"
          required
          style={{ backgroundColor: color }}
        />
        <input
          id="submit"
          type="submit"
          value={cta}
          name="subscribe"
          onClick={() => plausible(plausibleEvent)}
        />
        <p className={styles.giveaway}>{giveaway}</p>
      </form>
    </div>
  );
};

export default formInput;
