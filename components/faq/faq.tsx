import React from "react";
import styles from "./faq.module.scss";

const faq = ({ title, questions }) => {
  return (
    <div className={styles.faq}>
      <h2>{title}</h2>
      {questions.map((faq, index) => (
        <>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </>
      ))}
    </div>
  );
};

export default faq;
