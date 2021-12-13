import PlausibleProvider from "next-plausible";
import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import CookieConsent from "react-cookie-consent";

interface MyAppProps {
  Component: any;
  pageProps: any;
  pixel_id: string;
}

function MyApp({ Component, pageProps, pixel_id }: MyAppProps) {
  const [cookieAccept, setCookieAccept] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    console.log(
      "%cYOU GETTING THIS VARIABLE ?: ",
      "color:red;font-size:2em",
      process.env.FACEBOOK_PIXEL_ID
    );

    if (cookies.get("cookies")) {
      console.log(
        "%cyo the cookie is accept lets go pixel gang: ",
        "color:green;font-size:1.4em"
      );
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(pixel_id);
          ReactPixel.pageView();
          console.log(
            "%cPixel is set!",
            "color:green;font-size:1.4em"
          );

          router.events.on("routeChangeComplete", () => {
            ReactPixel.pageView();
            console.log(
              "%csend pixel pageview log!",
              "color:green;font-size:1.4em"
            );
          });
        });
    }
  }, [cookies.get("cookies"), cookieAccept]);

  return (
    <PlausibleProvider trackOutboundLinks={true} domain="robertbrunhage.com">
      <Component {...pageProps} />
      <CookieConsent
        disableStyles
        location="bottom"
        buttonText="I UNDERSTAND"
        declineButtonText="DECLINE"
        cookieName="cookies"
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
    </PlausibleProvider>
  );
}

export default MyApp;

export async function getStaticProps() {
  console.log(process.env.FACBOOK_PIXEL_ID);
  return {
    props: {
      pixel_id: process.env.FACEBOOK_PIXEL_ID,
    },
  };
}
