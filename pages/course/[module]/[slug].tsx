import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Layout from "../../../components/layout/layout";
import "prismjs";
import Prism from "prismjs";
import "prismjs/components/prism-dart";
import styles from "../../../styles/blog_post.module.scss";

const components = {};

export default function Course({
  source,
  module,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    console.log("source: ", source);
    console.log("module: ", module);
    console.log("slug: ", slug);

    Prism.highlightAll();
  }, [source]);

  return (
    <Layout>
      <div className={`max_width ${styles.content}`}>
        <div className={styles.article_container}>
          <aside>
            yo its me side menu
          </aside>
          <article className={styles.markdown}>
            <MDXRemote {...source} components={components} />
          </article>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const coursesDirectory = path.join("data/courses");

  const moduleDirectories = fs.readdirSync(coursesDirectory);

  const allPaths: {
    params: {
      module: string;
      slug: string;
    };
  }[] = [];

  moduleDirectories.forEach((module: string) => {
    const moduleDirectory = path.join(coursesDirectory, module);
    const files = fs.readdirSync(moduleDirectory);

    files.forEach((fileName: string) => {
      const path = {
        params: {
          module: module,
          slug: fileName.replace(".mdx", ""),
        },
      };

      allPaths.push(path);
    });
  });

  return {
    paths: allPaths,
    fallback: false,
  };
};

type Params = {
  [param: string]: any;
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params: { module, slug },
}: Params) => {
  const courses = fs.readFileSync(
    path.join("data/courses", module, slug + ".mdx")
  );

  const { data: metaData, content } = matter(courses);

  const mdxSource = await serialize(content, { scope: metaData });
  return { props: { source: mdxSource, module, slug } };
};
