import { MDXProvider } from "@mdx-js/react";
import PlausibleProvider from "next-plausible";
import React, { useEffect } from "react";
import EmailSignup from "../components/emailForm/forms/emailSignup";
import BlogShareFooter from "../components/footer/blogShareFooter/blogShareFooter";
import Heading2 from "../components/headings/h2";
import Heading3 from "../components/headings/h3";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/code-highlighting.css";
import "../styles/globals.scss";

import ModuleCard from "../components/cards/moduleCard/moduleCard";
import { trpc } from "../lib/trpc";
import { Toaster } from "react-hot-toast";

const components = {
  EmailSignup,
  BlogShareFooter,
  h2: Heading2,
  h3: Heading3,
  ModuleCard,
};

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <PlausibleProvider trackOutboundLinks={true} domain="robertbrunhage.com">
      <UserProvider>
        <Toaster position="bottom-center" />
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </UserProvider>
    </PlausibleProvider>
  );
}

export default trpc.withTRPC(MyApp);
