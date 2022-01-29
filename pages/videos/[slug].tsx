import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import "prismjs";
import Prism from "prismjs";
import "prismjs/components/prism-dart";
import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/layout";
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "../../core/mdx";
import styles from "../../styles/video_lesson.module.scss";

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
  slug: string;
}

export default function Lesson({ frontMatter, content, slug }: LessonProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <Layout>
      <Head>
        <title>{frontMatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://robertbrunhage.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta
          property="og:image"
          content={`https://robertbrunhage.com${frontMatter.image}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content={frontMatter.title} />
        <meta
          property="twitter:description"
          content={frontMatter.description}
        />
        <meta
          property="twitter:image"
          content={`https://robertbrunhage.com${frontMatter.image}`}
        />
        <link
          rel="canonical"
          href={`https://robertbrunhage.com/videos/${slug}`}
        />
      </Head>
      <article ref={articleRef} className={`max_width ${styles.content}`}>
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
        <div className={styles.markdown}>
          <MDXRemote {...content} />
        </div>
      </article>
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
  const { frontMatter } = post;

  return { props: { frontMatter, content, slug } };
}
