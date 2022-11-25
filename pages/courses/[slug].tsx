import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { formatSlug, getFiles, getCourseFrontMatter } from "../../core/mdx";

const Course = ({ course }: any) => {
  const router = useRouter();
  useEffect(() => {
    console.log(course);
    console.log(router);
  }, []);

  return (
    <Layout>
      <div className="max_width">
        <h1>{router.query.slug}</h1>
        <ul>
          {course.map(({ title, author, slug }: any) => (
            <Link
              href={`${router.asPath}/[slug]`}
              as={`${router.asPath}/${slug}`}
            >
              <div>
                {title} - {author} - {slug}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Course;

export async function getStaticProps({ params: { slug } }: any) {
  const course = await getCourseFrontMatter(slug);

  return { props: { course } };
}

export async function getStaticPaths() {
  const posts = await getFiles("courses");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p),
      },
    })),
    fallback: false,
  };
}
