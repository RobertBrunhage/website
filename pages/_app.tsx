import PlausibleProvider from "next-plausible";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import "../styles/code-highlighting.css";
import "../styles/globals.scss";

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
      <Component {...pageProps} />
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
    </PlausibleProvider>
  );
}

export default MyApp;
