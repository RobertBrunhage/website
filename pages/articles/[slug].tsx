import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import "prismjs";
import Prism from "prismjs";
import React, { useEffect, useRef } from "react";
import { TOC } from "../../components/headings/toc";
import Layout from "../../components/layout/layout";
import CommonSEO from "../../components/seo/seo";
import { formatSlug, getFileBySlug, getFiles } from "../../core/mdx";
import { getHeadings } from "../../core/utils";
import styles from "../../styles/blog_post.module.scss";

require("prismjs/components/prism-dart");

export interface FrontmatterProps {
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
  featured: boolean;
}

interface ArticleProps {
  frontMatter: FrontmatterProps;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  rawContent: string;
  slug: string;
}

export default function Article({
  frontMatter,
  content,
  rawContent,
  slug,
}: ArticleProps) {
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
        subroute={`/articles/${slug}`}
      >
        <link
          rel="canonical"
          href={`https://robertbrunhage.com/articles/${slug}`}
        />
      </CommonSEO>
      <div ref={articleRef} className={`max_width ${styles.content}`}>
        <header>
          <h1 className={styles.title}>{frontMatter.title}</h1>
          <h4 className={styles.quote}>
            {"🕑 " + frontMatter.readingTime.text}
          </h4>
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
  const posts = await getFiles("articles");

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
  // const allPosts = await getAllFilesFrontMatter("articles");
  // const postIndex = allPosts.findIndex((post) => post.slug === slug);
  // const prev = allPosts[postIndex + 1] || null;
  // const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("articles", slug);

  const content = post.mdxSource;
  const rawContent = post.content;
  const { frontMatter } = post;

  return { props: { frontMatter, content, rawContent, slug } };
}
