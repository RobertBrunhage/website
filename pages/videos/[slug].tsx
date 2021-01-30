import React from "react";
import Layout from "@components/layout/layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Head from "next/head";
import styles from "@styles/video_lesson.module.scss";
import PlausibleProvider from "next-plausible";

const CodeBlock = ({ value }) => {
  return (
    <SyntaxHighlighter
      language={"dart"}
      style={vscDarkPlus}
      lineProps={{ style: { fontSize: "1.6rem" } }}
      wrapLines={true}
      showInlineLineNumbers={false}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default function Lesson({ content, frontmatter }) {
  return (
    <PlausibleProvider domain="robertbrunhage.com">
      <Layout>
        <Head>
          <title>{frontmatter.title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:url" content="https://robertbrunhage.com" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={frontmatter.title} />
          <meta property="og:description" content={frontmatter.description} />
          <meta property="og:image" content={`https://robertbrunhage.com${frontmatter.image}`} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content="@robertbrunhage" />
          <meta property="twitter:title" content={frontmatter.title} />
          <meta property="twitter:description" content={frontmatter.description} />
          <meta property="twitter:image" content={`https://robertbrunhage.com${frontmatter.image}`} />
        </Head>
        <div className={styles.content}>
          <h1>{frontmatter.title}</h1>
          {frontmatter.youtube ? (
            <div className={styles.video}>
              <iframe src={`https://www.youtube.com/embed/${frontmatter.youtube}`} />
              <div className={styles.desc}>
                <h2>{frontmatter.description}</h2>
                <h4>{frontmatter.author}</h4>
                <h3>{frontmatter.date}</h3>
                <a href={frontmatter.github} rel="noopener noreferrer" target="_blank">
                  CODE
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={styles.markdown}>
            <ReactMarkdown escapeHtml={false} source={content} renderers={{ code: CodeBlock }} />
          </div>
        </div>
      </Layout>
    </PlausibleProvider>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync("content/lessons");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs.readFileSync(path.join("content/lessons", slug + ".md")).toString();

  const { data, content } = matter(markdownWithMetadata);

  const frontmatter = {
    ...data,
  };

  return {
    props: {
      content: content,
      frontmatter,
    },
  };
}
