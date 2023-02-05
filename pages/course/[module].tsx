import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import fs from "fs";
import path from "path";
import React from "react";
import styles from "../../styles/course_landing.module.scss";
import Layout from "../../components/layout/layout";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getCourseFrontMatter } from "../../core/mdx";
import CourseCard from "../../components/cards/courseCard/courseCard";

const components = {};

interface ModulesProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  module: string;
  modules: Array<any>;
}

export default function Course({ source, module, modules }: ModulesProps) {
  return (
    <Layout>
      <div className={`max_width ${styles.course_layout}`}>
        <div
          className={styles.video}
          style={{ display: source.scope?.vimeo ? "" : "none" }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${source.scope?.vimeo}`}
            allowFullScreen
          />
        </div>

        <article>
          <MDXRemote {...source} components={components} />
        </article>

        <div className={styles.card_container}>
          {modules.map(({ image, title, description, slug }, index) => (
            <CourseCard
              key={index}
              img={image}
              title={title}
              description={description}
              slug={slug}
              route={`course/${module}`}
            />
          ))}
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
    };
  }[] = [];

  moduleDirectories.forEach((module: string) => {
    const moduleDirectory = path.join(coursesDirectory, module);
    const files = fs.readdirSync(moduleDirectory);

    files.forEach(() => {
      const path = {
        params: {
          module: module,
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
  params: { module },
}: Params) => {
  const course = fs.readFileSync(
    path.join("data/courses", module, "__index.mdx")
  );

  const { data: metaData, content } = matter(course);
  const modules = await getCourseFrontMatter(module);

  const mdxSource = await serialize(content, { scope: metaData });

  return { props: { source: mdxSource, module, modules } };
};
