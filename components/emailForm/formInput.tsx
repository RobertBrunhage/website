import React from "react";
import styles from "./formInput.module.scss";
import { usePlausible } from "next-plausible";

interface FormInputProps {
  action: string;
  color: any;
  cta: string;
  giveaway?: string;
  plausibleEvent: string;
  plausibleEventProp: string;
}

const FormInput = ({
  action,
  color,
  cta,
  giveaway,
  plausibleEvent,
  plausibleEventProp,
}: FormInputProps) => {
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
          onClick={() =>
            plausible(plausibleEvent, {
              props: {
                type: plausibleEventProp,
              },
            })
          }
        />
        <p className={styles.giveaway}>{giveaway}</p>
      </form>
    </div>
  );
};

export default FormInput;
