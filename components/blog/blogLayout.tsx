import React from "react";
import BlogCard from "../cards/blogCard/blogCard";
import styles from "./blogLayout.module.scss";

interface BlogProps {
  posts: Array<any>;
  title: string;
  description: string;
  route: "articles" | "videos";
}

export interface FrontmatterProps {
  title: string;
  description: string;
  image: string;
  featured: boolean;
  slug: any;
}

const blogLayout = ({ posts, title, description, route }: BlogProps) => {
  return (
    <div className="max_width">
      <h1 className={styles.title}>{title}</h1>
      <h4 className={styles.subtitle}>{description}</h4>
      <div className={styles.card_container}>
        {posts.map(({ title, description, image, slug }: FrontmatterProps) => (
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
