import React from "react";
import { VideoFrontMatterInfo } from "../../pages/videos";
import BlogCard from "../cards/blogCard/blogCard";
import styles from "./blogLayout.module.scss";

interface BlogProps {
  posts: VideoFrontMatterInfo[];
  title: string;
  description: string;
  route: "articles" | "videos";
}

const blogLayout = ({ posts, title, description, route }: BlogProps) => {
  return (
    <div className="max_width">
      <h1 className={styles.title}>{title}</h1>
      <h4 className={styles.subtitle}>{description}</h4>
      <div className={styles.card_container}>
        {posts
          .filter((post) => post.status != "draft")
          .map(({ title, description, image, slug }) => (
            <BlogCard
              key={slug}
              slug={slug}
              title={title}
              description={description}
              image={image}
              route={route}
            />
          ))}
      </div>
    </div>
  );
};

export default blogLayout;
