import React from "react";
import BlogLayout from "../components/blog/blogLayout";
import Layout from "../components/layout/layout";
import CommonSEO from "../components/seo/seo";
import { getAllFilesFrontMatter } from "../core/mdx";

export type VideoFrontMatter = {
  title: string;
  description: string;
  image: string;
  youtube: string;
  github: string;
  author: string;
  date: string;
  featured: boolean;
  status?: string;
  slug: string;
};

const videos = ({ videos }: { videos: VideoFrontMatter[] }) => {
  return (
    <Layout>
      <CommonSEO
        title="Robert Brunhage - Flutter, Dart, Firebase | Videos"
        description="Video lesson on topics such as Flutter, Dart, Firebase and more | Robert Brunhage"
        ogImage={videos[0].image}
        twImage={videos[0].image}
        ogType="article"
        subroute="/videos"
      >
        <link rel="canonical" href="https://robertbrunhage.com/videos" />
      </CommonSEO>
      <BlogLayout
        posts={videos}
        title={"Videos"}
        description="A collection of my videos with a written guide to accompany it!"
        route="videos"
      ></BlogLayout>
    </Layout>
  );
};

export default videos;

export async function getStaticProps() {
  const videos: VideoFrontMatter[] = await getAllFilesFrontMatter(
    "lessons",
  );

  return { props: { videos } };
}
