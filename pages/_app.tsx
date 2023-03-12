import { MDXProvider } from "@mdx-js/react";
import PlausibleProvider from "next-plausible";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import EmailSignup from "../components/emailForm/forms/emailSignup";
import BlogShareFooter from "../components/footer/blogShareFooter/blogShareFooter";
import Heading2 from "../components/headings/h2";
import Heading3 from "../components/headings/h3";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/code-highlighting.css";
import "../styles/globals.scss";

import ModuleCard from "../components/cards/moduleCard/moduleCard";

const components = { EmailSignup, BlogShareFooter, h2: Heading2, h3: Heading3, ModuleCard };

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [cookieAccept, setCookieAccept] = useState(false);
  const router = useRouter();
  const cookieStatus = getCookieConsentValue();

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (cookieStatus === "true") {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`);
          ReactPixel.pageView();

          router.events.on("routeChangeComplete", () => {
            ReactPixel.pageView();
          });
        });
    }
  }, [cookieStatus, cookieAccept]);

  return (
    <PlausibleProvider trackOutboundLinks={true} domain="robertbrunhage.com">
      <UserProvider>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
        <CookieConsent
          disableStyles
          location="bottom"
          buttonText="I UNDERSTAND"
          declineButtonText="DECLINE"
          overlay
          expires={365}
          enableDeclineButton
          overlayClasses="CookieConsentOverlay"
          buttonClasses="CookieConsentBtn"
          declineButtonClasses="CookieConsentBtn DeclineBtn"
          flipButtons
          buttonWrapperClasses="Btns"
          onAccept={() => setCookieAccept(true)}
        >
          <h3>This site uses cookies</h3>
          <p>
            This site uses cookies to help tailor ads on third-party websites.
          </p>
          <p>
            Read more about our{" "}
            <a style={{ color: "#22e2e2" }} href="/cookie_policy">
              Cookie policy
            </a>
          </p>
        </CookieConsent>
      </UserProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
