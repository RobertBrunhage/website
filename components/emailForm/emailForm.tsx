import React from "react";
import styles from "./emailForm.module.scss";
import FormInput from "./formInput";

interface EmailFormProps {
  color: any;
  title: string;
  description: string;
  cta: string;
  giveaway?: string;
  action: string;
  plausibleEvent: string;
  plausibleEventProp: string;
}

const EmailForm = ({
  color,
  title,
  description,
  giveaway,
  cta,
  action,
  plausibleEvent,
  plausibleEventProp,
}: EmailFormProps) => {
  return (
    <div className={styles.email_container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      <FormInput
        action={action}
        color={color}
        cta={cta}
        giveaway={giveaway}
        plausibleEvent={plausibleEvent}
        plausibleEventProp={plausibleEventProp}
      />
    </div>
  );
};

export default EmailForm;
