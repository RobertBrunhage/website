import React from "react";
import styles from "./faq.module.scss";

const faq = ({ title, questions }) => {
  return (
    <div className={styles.faq}>
      <h2>{title}</h2>
      {questions.map((faq, index) => (
        <details key={index}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default faq;
