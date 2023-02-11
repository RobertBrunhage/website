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
import useAuthenticatedApi from "../../../lib/use-api";

const components = {};

interface MenuProps {
  chapter?: string;
  title: string;
  slug: string;
}

export default function Course({
  source,
  module,
  slug,
  course,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sideMenu, setSideMenu] = useState<Array<MenuProps>>([]);
  const { response } = useAuthenticatedApi<boolean>('/api/course/has-access', {
    method: "POST",
    body: JSON.stringify({ stripeProductId: 'prod_NInXljEw7mMKMV' }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

  let menu: Array<MenuProps> = [];

  useEffect(() => {
    console.log(module);
    course.forEach((i: any) => {
      if (i.slug === "__index") return;
      let item = { chapter: i.chapter, title: i.title, slug: i.slug };
      menu.push(item);
    });

    setSideMenu(menu);
    Prism.highlightAll();
  }, [course]);

  return (
    <Layout>
      <div className={`max_width ${styles.course_layout}`}>
        <aside className={styles.menu}>
          <SideNavigation menu={sideMenu} module={module} slug={slug} />
        </aside>
        <div
          className={styles.video}
          style={{ display: source.scope.vimeo ? "" : "none" }}
        >
          {response?.value ? (
            <iframe
              src={`https://player.vimeo.com/video/${source.scope.vimeo}`}
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
