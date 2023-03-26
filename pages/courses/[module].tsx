import { GetStaticPaths, GetStaticProps } from 'next';
import { loadStripe } from '@stripe/stripe-js';
import fs from 'fs';
import path from 'path';
import React, { useEffect } from 'react';
import styles from '../../styles/course_landing.module.scss';
import Layout from '../../components/layout/layout';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getCourseFrontMatter } from '../../core/mdx';
import Link from 'next/link';
import PricingCard, {
  Packages,
} from '../../components/cards/pricingCard/pricingCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { trpc } from '../../lib/trpc';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '../../server/routers/_app';

type ModulesProps = {
  source: MDXRemoteSerializeResult<SourceProps>;
  module: string;
  modules: Array<any>;
};

type SourceProps = {
  image: string;
  title: string;
  courseName: string;
  courseId: string;
  description: string;
  previousPrice: string;
  vimeo: number;
  date: string;
  package: Array<Packages>;
};

loadStripe(
  //@ts-ignore
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Course({ source, module, modules }: ModulesProps) {
  const { user } = useUser();

  const courseResponse = trpc.course.course.useQuery(
    { courseName: source.scope!.courseId },
  );

  const hasAccessResponse = trpc.course.hasAccess.useQuery(
    { stripeProductId: 'prod_NInXljEw7mMKMV' },
    { enabled: user !== undefined },
  );

  useEffect(() => {
    modules.sort((a, b) => a.weight - b.weight);
  }, [modules]);

  return (
    <Layout>
      <div className={`${styles.course_layout}`}>
        <section className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.section_title}>{source.scope?.title}</h1>
            <h3>{source.scope?.description}</h3>
          </div>

          <div
            className={styles.video}
            style={{ display: source.scope?.vimeo ? undefined : 'none' }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${source.scope?.vimeo}`}
              allowFullScreen
            />
          </div>
        </section>

        <section>
          <h1 className={styles.section_title}>{source.scope?.courseName}</h1>
          <PricingCard
            title={source.scope?.courseName ?? ''}
            price={courseResponse?.data?.price}
            previousPrice={`$${source.scope?.previousPrice}`}
            price_package={source.scope?.package ?? [{ name: '' }]}
            className={styles.pricing_light}
            productId={courseResponse?.data?.stripeProductId ?? ''}
            module={module}
            modules={modules}
            ownsCourse={hasAccessResponse?.data}
          />
          {user ? (
            ''
          ) : (
            <div className={styles.owner}>
              <p>Already own this course?</p>
              <Link
                legacyBehavior={true}
                href={`/api/auth/login?returnTo=/courses/${module}`}
              >
                <a className={`${styles.login}`}> Login to watch</a>
              </Link>
            </div>
          )}
        </section>

        <section>
          <article className={styles.content}>
            <MDXRemote {...source} />
          </article>
        </section>

        <section>
          <h1 className={styles.section_title}>Lessons</h1>
          <div className={styles.card_container}>
            <ul>
              {modules.map(({ title, slug }, index) =>
                source.scope?.title === title ? (
                  ''
                ) : (
                  <Link
                    href={`/${`courses/${module}`}/[slug]`}
                    as={`/${`courses/${module}`}/${slug}`}
                    key={index}
                  >
                    <li>
                      <span>{index}</span> {title}
                    </li>
                  </Link>
                )
              )}
            </ul>
          </div>
        </section>

        <section>
          <PricingCard
            title={source.scope?.courseName ?? ''}
            price={courseResponse?.data?.price}
            previousPrice={`$${source.scope?.previousPrice}`}
            price_package={source.scope?.package ?? [{ name: '' }]}
            productId={courseResponse?.data?.stripeProductId ?? ''}
            module={module}
            modules={modules}
            ownsCourse={hasAccessResponse?.data}
          />
          {user ? (
            ''
          ) : (
            <div className={styles.owner}>
              <p>Already own this course?</p>
              <Link
                legacyBehavior={true}
                href={`/api/auth/login?returnTo=/courses/${module}`}
              >
                <a className={`${styles.login}`}> Login to watch</a>
              </Link>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const coursesDirectory = path.join('data/courses');

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
    path.join('data/courses', module, '__index.mdx')
  );

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: undefined, ip: '' },
  });

  const { data: metaData, content } = matter(course);
  const modules = await getCourseFrontMatter(module);

  const mdxSource = await serialize(content, { scope: metaData });

  const source = mdxSource as MDXRemoteSerializeResult<SourceProps>;

  await ssg.course.course.prefetch(
    { courseName: source.scope!.courseId },
  );

  return { props: { source: source, module, modules, trpcState: ssg.dehydrate(), } };
};


