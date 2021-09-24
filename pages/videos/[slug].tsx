import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Head from "next/head";
import styles from "../../styles/video_lesson.module.scss";
import PlausibleProvider from "next-plausible";

interface FrontmatterProps {
  title: string;
  description: string;
  image: string;
  youtube: string;
  author:string;
  date: string;
  github: string;
  slug: any;
}

interface CodeBlockProps {
  value: any;
}

interface LessonProps {
  content: string;
  frontmatter: FrontmatterProps;
  slug: string;
}

const CodeBlock = ({ value }: CodeBlockProps) => {
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

const MyImage = (props: any, width: number | undefined) => {
  return (
    <img alt={props.alt} src={props.src} style={{ maxWidth: width ?? 400 }} />
  );
};

export default function Lesson({ content, frontmatter, slug }: LessonProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  const maxWidth = useResize(articleRef);

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
          <meta
            property="og:image"
            content={`https://robertbrunhage.com${frontmatter.image}`}
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content="@robertbrunhage" />
          <meta property="twitter:title" content={frontmatter.title} />
          <meta
            property="twitter:description"
            content={frontmatter.description}
          />
          <meta
            property="twitter:image"
            content={`https://robertbrunhage.com${frontmatter.image}`}
          />
          <link
            rel="canonical"
            href={`https://robertbrunhage.com/videos/${slug}`}
          />
        </Head>
        <article ref={articleRef} className={`max_width ${styles.content}`}>
          <h1>{frontmatter.title}</h1>
          {frontmatter.youtube ? (
            <div className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/${frontmatter.youtube}`}
              />
              <div className={styles.desc}>
                <p className={styles.description}>{frontmatter.description}</p>
                <p className={styles.author}>{frontmatter.author}</p>
                <p className={styles.date}>{frontmatter.date}</p>
                {frontmatter.github ? (
                  <a
                    href={frontmatter.github}
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
            <ReactMarkdown
              escapeHtml={false}
              source={content}
              renderers={{
                code: CodeBlock,
                image: (props) => MyImage(props, maxWidth),
              }}
            />
          </div>
        </article>
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

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/lessons", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  const frontmatter = {
    ...data,
  };

  return {
    props: {
      content: content,
      frontmatter,
      slug,
    },
  };
}

const useResize = (myRef: React.RefObject<HTMLDivElement>) => {
  const getWidth = useCallback(() => myRef?.current?.offsetWidth, [myRef]);

  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWidth());
    };

    if (myRef.current) {
      setWidth(getWidth());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, getWidth]);

  return width && width > 25 ? width - 25 : width;
};
