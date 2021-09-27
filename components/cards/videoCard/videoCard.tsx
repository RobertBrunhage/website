import Link from "next/link";
import React from "react";
import styles from "./videoCard.module.scss";

const videoCard = ({ slug, title, image, description }: any) => {
  return (
    <Link href={"/videos/[slug]"} as={`/videos/${slug}`} key={title}>
      <div className={styles.video_card}>
        <img src={image} alt="thumbnail" />
        <h1>{title}</h1>
        <p className={styles.line_clamp}>{description}</p>
      </div>
    </Link>
  );
};

export default videoCard;
