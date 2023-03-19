import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Layout from '../../../components/layout/layout';
import 'prismjs';
import Prism from 'prismjs';
import 'prismjs/components/prism-dart';
import styles from '../../../styles/course_layout.module.scss';
import SideNavigation, {
  MenuProps,
} from '../../../components/sideNavigation/sideNavigation';
import { getCourseFrontMatter } from '../../../core/mdx';
import useAuthenticatedApi from '../../../lib/use-api';
import { AllSeenResponse } from '../../api/course/all-seen';

const components = {};

type LectureFrontMatter = {
  title: string;
  lectureId: string;
  vimeo?: number;
  github: string;
  chapter?: string;
};

type LectureProps = {
  source: MDXRemoteSerializeResult<LectureFrontMatter>;
  module: string;
  slug: string;
  course: Array<any>;
  modules: Array<any>;
};

export default function Course({ source, module, slug, course }: LectureProps) {
  const [sideMenu, setSideMenu] = useState<Array<MenuProps>>([]);
  const { response } = useAuthenticatedApi<boolean>('/api/course/has-access', {
    method: 'POST',
    body: JSON.stringify({ stripeProductId: 'prod_NInXljEw7mMKMV' }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

  const { isLoading, response: peppa } = useAuthenticatedApi<AllSeenResponse>(
    '/api/course/all-seen',
    {
      method: 'POST',
      body: JSON.stringify({ courseName: module }),
    }
  );

  const handleSeen = () => {
    fetch('/api/course/seen', {
      method: 'POST',
      body: JSON.stringify({
        courseName: module,
        lectureName: source.scope?.lectureId,
        seen: true,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    });
  };

  let menu: Array<MenuProps> = [];

  useEffect(() => {
    console.log(source);
    course.forEach((i: any) => {
      if (i.slug === '__index') return;

      let seen = false;

      if (!isLoading) {
        const allSeenNames = peppa.value!.allSeen.map((l) => l.name);
        const lectureIdIndex = allSeenNames.indexOf(i.lectureId);
        if (lectureIdIndex !== -1) {
          seen = peppa.value?.allSeen[lectureIdIndex].seen ?? false;
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

    setSideMenu(menu);
    Prism.highlightAll();
  }, [course, peppa]);

  return (
    <Layout>
      <div className={`max_width ${styles.course_layout}`}>
        <aside className={styles.menu}>
          <SideNavigation menu={sideMenu} module={module} slug={slug} />
        </aside>
        <div
          className={styles.video}
          style={{ display: source?.scope?.vimeo ? '' : 'none' }}
        >
          <div className={styles.video_wrapper}>
            {response?.value && source?.scope?.vimeo ? (
              <iframe
                src={`https://player.vimeo.com/video/${source.scope.vimeo}`}
                allowFullScreen
              />
            ) : (
              <div className={styles.sign_in}>
                <h3>
                  You must <span> sign in </span> to watch.
                </h3>
              </div>
            )}
          </div>
          <button onClick={() => handleSeen()}>mark as seen</button>
        </div>
        <article className={styles.content}>
          <MDXRemote {...source} components={components} />
        </article>
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
          slug: fileName.replace('.mdx', ''),
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
    path.join('data/courses', module, slug + '.mdx')
  );

  const { data: metaData, content } = matter(courses);
  const course = await getCourseFrontMatter(module);

  const mdxSource = await serialize(content, { scope: metaData });

  return { props: { source: mdxSource, module, slug, course } };
};
