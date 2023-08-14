import Link from "next/link";
import React from "react";
import styles from "./blogCard.module.scss";

const BlogCard = ({ slug, title, image, description, route }: any) => {
  return (
    <Link href={`/${route}/[slug]`} as={`/${route}/${slug}`}>
      <div className={styles.video_card}>
        {
          // eslint-disable-next-line @next/next/no-img-element
          image ? <img src={image} alt="thumbnail" /> : null
        }
        <h1>{title}</h1>
        <p className={styles.line_clamp}>{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
