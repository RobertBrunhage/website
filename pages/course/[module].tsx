import { GetStaticPaths, GetStaticProps } from "next";
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
import buttonStyle from "../../components/buttons/cta/cta.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import useAuthenticatedApi from "../../lib/use-api";
import ModuleCard from "../../components/cards/moduleCard/moduleCard";
import PricingCard from "../../components/cards/pricingCard/pricingCard";

const components = { ModuleCard };

interface ModulesProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  module: string;
  modules: Array<any>;
}

interface course_package {
  name: string;
}

const course_package: course_package[] = [
  {
    name: "7 modules",
  },
  {
    name: "Lifetime access",
  },
  {
    name: "Before and after source code for all videos",
  },
  {
    name: "All future updates",
  },
];

loadStripe(
  //@ts-ignore
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Course({ source, module, modules }: ModulesProps) {
  const { response } = useAuthenticatedApi<string>("/api/course/course", {
    method: "POST",
    body: JSON.stringify({ courseName: module }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });
  const { user } = useUser();

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
  }, [response]);

  useEffect(() => {
    console.log("source: ", source);
    console.log("module: ", module);
    console.log("modules: ", modules);
  }, [source]);

  return (
    <Layout>
      <div className={`max_width ${styles.course_layout}`}>
        <section className={styles.main}>
          <div className={styles.header}>
            <h1>{source.scope?.title}</h1>
            <p>{source.scope?.description}</p>
          </div>

          <div
            className={styles.video}
            style={{ display: source.scope?.vimeo ? "" : "none" }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${source.scope?.vimeo}`}
              allowFullScreen
            />
          </div>
        </section>

        <PricingCard
          title={source.scope?.title}
          price="$99"
          price_package={course_package}
        >
          {user ? (
            <form
              action={`/api/checkout_sessions/?productId=${response?.value}&successPath=/course/${module}`}
              method="POST"
            >
              <section>
                <button
                  className={`${buttonStyle.button} ${styles.btn}`}
                  type="submit"
                  role="link"
                >
                  Buy
                </button>
              </section>
            </form>
          ) : (
            <Link
              legacyBehavior={true}
              href={`/api/auth/login?returnTo=/course/${module}`}
            >
              <a className={`${buttonStyle.button} ${styles.btn}`}>Buy</a>
            </Link>
          )}
        </PricingCard>

        <article className={styles.content}>
          <MDXRemote {...source} components={components} />
        </article>

        <div className={styles.card_container}>
          <ul>
            {modules.map(({ title }, index) =>
              source.scope?.title === title ? (
                ""
              ) : (
                <li>
                  <span>{index + 1}</span> {title}
                </li>
                /* <CourseCard
                key={index}
                img={image}
                title={title}
                description={description}
                slug={slug}
                route={`course/${module}`}
              /> */
              )
            )}
          </ul>
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
