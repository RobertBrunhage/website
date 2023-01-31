import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Layout from "../../../components/layout/layout";
import "prismjs";
import Prism from "prismjs";
import "prismjs/components/prism-dart";
import styles from "../../../styles/course_layout.module.scss";
import SideNavigation from "../../../components/sideNavigation/sideNavigation";
import { getCourseFrontMatter } from "../../../core/mdx";

const components = {};

let authorized = true;

export default function Course({
  source,
  module,
  slug,
  course,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [slugMenu, setSlugMenu] = useState<Array<string>>([]);

  let menu: Array<string> = [];

  useEffect(() => {
    course.forEach((i: any) => {
      if (i.slug === "__index") return;
      menu.push(i.slug);
    });

    setSlugMenu(menu);
    Prism.highlightAll();
  }, [course]);

  return (
    <Layout>
      <div className={`max_width ${styles.course_layout}`}>
        <aside className={styles.menu}>
          <SideNavigation menu={slugMenu} module={module} slug={slug} />
        </aside>
        <div className={styles.video}>
          {authorized ? (
            <iframe
              style={{ display: !authorized ? "none" : "" }}
              src={`https://player.vimeo.com/video/${787938115}`}
              allowFullScreen
            />
          ) : (
            <div className={styles.sign_in}>
              <h3>
                You must <span> sign in </span> to watch.
              </h3>
            </div>
          )}
        </div>
        <article className={styles.content}>
          <MDXRemote {...source} components={components} />
        </article>
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
  const course = await getCourseFrontMatter(module);

  const mdxSource = await serialize(content, { scope: metaData });
  return { props: { source: mdxSource, module, slug, course } };
};
