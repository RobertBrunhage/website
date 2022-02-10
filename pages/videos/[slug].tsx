import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import "prismjs";
import Prism from "prismjs";
import "prismjs/components/prism-dart";
import React, { useEffect, useRef } from "react";
import { TOC } from "../../components/headings/toc";
import Layout from "../../components/layout/layout";
import CommonSEO from "../../components/seo/seo";
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "../../core/mdx";
import { getHeadings } from "../../core/utils";
import styles from "../../styles/blog_post.module.scss";

interface FrontmatterProps {
  title: string;
  description: string;
  image: string;
  youtube: string;
  author: string;
  date: string;
  github: string;
  slug: any;
  wordCount: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  fileName: string;
}

interface LessonProps {
  frontMatter: FrontmatterProps;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  rawContent: string;
  slug: string;
}

export default function Lesson({
  frontMatter,
  content,
  rawContent,
  slug,
}: LessonProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const headings = getHeadings(rawContent);

  return (
    <Layout>
      <CommonSEO
        title={frontMatter.title}
        description={frontMatter.description}
        ogImage={frontMatter.image}
        twImage={frontMatter.image}
        ogType="article"
      >
        <link
          rel="canonical"
          href={`https://robertbrunhage.com/videos/${slug}`}
        />
      </CommonSEO>
      <div ref={articleRef} className={`max_width ${styles.content}`}>
        <header>
          <h1>{frontMatter.title}</h1>
          {frontMatter.youtube ? (
            <div className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/${frontMatter.youtube}`}
              />
              <div className={styles.desc}>
                <p className={styles.description}>{frontMatter.description}</p>
                <p className={styles.author}>{frontMatter.author}</p>
                <p className={styles.date}>{frontMatter.date}</p>
                {frontMatter.github ? (
                  <a
                    href={frontMatter.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    CODE
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </header>
        <div className={styles.article_container}>
          <article className={styles.markdown}>
            <MDXRemote {...content} />
          </article>
          <aside>
            <TOC headings={headings} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles("lessons");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const allPosts = await getAllFilesFrontMatter("lessons");
  const postIndex = allPosts.findIndex((post) => post.slug === slug);
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("lessons", slug);

  const content = post.mdxSource;
  const rawContent = post.content;
  const { frontMatter } = post;

  return { props: { frontMatter, content, rawContent, slug } };
}
