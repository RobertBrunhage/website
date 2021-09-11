import React from "react";
import styles from "./faq.module.scss";

interface Questions {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  questions: Array<Questions>;
}

const faq = ({ title, questions }: FAQProps) => {
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
