import React from "react";
import Head from "next/head";
import { getBaseUrl } from "./settings";

interface CommonSeoProps {
  title: string;
  description: string;
  ogType: "website" | "article";
  twImage: string;
  ogImage: string;
  children?: React.ReactNode;
}

const CommonSEO = (props: CommonSeoProps) => {
  const baseUrl = getBaseUrl();
  console.log(
    `You are currently on ${baseUrl} and the image path is ${props.twImage}`
  );
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:type" content={props.ogType} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={`${baseUrl}${props.ogImage}`} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@robertbrunhage" />
      <meta property="twitter:title" content="Robert Brunhage" />
      <meta property="twitter:description" content={props.description} />
      {props.children}
    </Head>
  );
};

export default CommonSEO;
