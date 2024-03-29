import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useMemo } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Layout from "../../../components/layout/layout";
import "prismjs";
import Prism from "prismjs";
import styles from "../../../styles/course_layout.module.scss";
import SideNavigation, {
  MenuProps,
} from "../../../components/sideNavigation/sideNavigation";
import { getCourseFrontMatter } from "../../../core/mdx";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { trpc } from "../../../lib/trpc";
import { toast } from "react-hot-toast";
import { CourseFrontMatter } from "../../courses";

require("prismjs/components/prism-dart");

const components = {};

type LectureProps = {
  source: MDXRemoteSerializeResult<CourseFrontMatter>;
  module: string;
  slug: string;
  course: CourseFrontMatter[];
};

export default function Lecture({
  source,
  module,
  slug,
  course,
}: LectureProps) {
  const { user } = useUser();
  const hasAccessResponse = trpc.course.hasAccess.useQuery(
    { stripeProductId: "prod_NInXljEw7mMKMV" },
    { enabled: user !== undefined },
  );

  const mutateSeen = trpc.course.seen.useMutation({
    onSuccess: () => {
      allSeenLecturesResponse.refetch();
    },
    onError: () => {
      toast.error("Could not mark as seen");
    },
  });

  const allSeenLecturesResponse = trpc.course.allSeen.useQuery(
    { courseName: module },
    { enabled: user !== undefined },
  );

  const handleSeen = async (state: boolean) => {
    mutateSeen.mutate({
      courseName: module,
      lectureName: source.scope!.lectureId,
      seen: state,
    });
  };

  const menuItems = useMemo(() => {
    let menu: Array<MenuProps> = [];
    course.forEach((i) => {
      if (i.slug === "__index") return;

      let seen = false;

      if (!allSeenLecturesResponse.isLoading && allSeenLecturesResponse) {
        const allSeenNames = allSeenLecturesResponse!.data!.map((l) => l.name);
        const lectureIdIndex = allSeenNames.indexOf(i.lectureId);
        if (lectureIdIndex !== -1) {
          seen = allSeenLecturesResponse!.data![lectureIdIndex].seen ?? false;
        }
      }

      let item = {
        chapter: i.chapter,
        title: i.title,
        slug: i.slug,
        weight: i.weight,
        free: i.free,
        seen: seen,
      };

      menu.push(item);
    });

    menu.sort((a, b) => a.weight - b.weight);

    return menu;
  }, [allSeenLecturesResponse, course]);

  const seen = menuItems.find((item) => item.slug === slug)?.seen ?? false;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout>
      <div className={`max_width ${styles.course_layout}`}>
        <aside className={styles.menu}>
          <SideNavigation
            menu={menuItems}
            module={module}
            slug={slug}
            hasAccess={hasAccessResponse.data ?? false}
          />
        </aside>
        <div
          className={styles.video}
          style={{ display: source?.scope?.vimeo ? "" : "none" }}
        >
          <div className={styles.video_wrapper}>
            {hasAccessResponse?.data && source?.scope?.vimeo ? (
              <>
                <iframe
                  src={`https://player.vimeo.com/video/${source.scope.vimeo}`}
                  allowFullScreen
                />
                {seen ? (
                  <button
                    className={styles.seen}
                    onClick={() => handleSeen(false)}
                  >
                    mark as unseen
                  </button>
                ) : (
                  <button
                    className={styles.seen}
                    onClick={() => handleSeen(true)}
                  >
                    mark as seen
                  </button>
                )}
              </>
            ) : (
              <div className={styles.sign_in}>
                <h3>
                  You must{" "}
                  <Link
                    legacyBehavior={true}
                    href={`/api/auth/login?returnTo=/courses/${module}/${slug}`}
                  >
                    <a className={styles.btn}> sign in </a>
                  </Link>{" "}
                  to watch.
                </h3>
              </div>
            )}
          </div>
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
    path.join("data/courses", module, slug + ".mdx"),
  );

  const { data: metaData, content } = matter(courses);
  const courseFrontMatter: CourseFrontMatter[] =
    await getCourseFrontMatter(module);

  const mdxSource = await serialize(content, { scope: metaData });

  return {
    props: { source: mdxSource, module, slug, course: courseFrontMatter },
  };
};
