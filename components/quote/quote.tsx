import React from "react";
import styles from "./quote.module.scss";

interface QuoteProps {
  quote: string;
  image: string;
  author: string;
  background?: string;
  quoteColor?: string;
}

const quote = ({
  quote,
  image,
  author,
  background,
  quoteColor,
}: QuoteProps) => {
  return (
    <div
      className={styles.quote_container}
      style={{ backgroundColor: background }}
    >
      <blockquote>
        <p>{quote}</p>
      </blockquote>
      <figcaption>
        <div
          className={styles.author_image}
          style={{ backgroundImage: `url(${image}` }}
        />
        <h1>{author}</h1>
      </figcaption>
    </div>
  );
};

export default quote;
