import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { loadStripe } from "@stripe/stripe-js";
import fs from "fs";
import path from "path";
import React, { useEffect } from "react";
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

const stripePromise = loadStripe(
  //@ts-ignore
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Course({ source, module, modules }: ModulesProps) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

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

        <form action="/api/checkout_sessions" method="POST">
          <section>
            <button type="submit" role="link">
              Checkout
            </button>
          </section>
          <style jsx>
            {`
              section {
                background: #ffffff;
                display: flex;
                flex-direction: column;
                width: 400px;
                height: 112px;
                border-radius: 6px;
                justify-content: space-between;
              }
              button {
                height: 36px;
                background: #556cd6;
                border-radius: 4px;
                color: white;
                border: 0;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
              }
              button:hover {
                opacity: 0.8;
              }
            `}
          </style>
        </form>

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
