/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Layout from "../components/layout/layout";
import { resetCookieConsentValue } from "react-cookie-consent";

const cookie_policy = () => {
  return (
    <Layout>
      <div className="max_width">
        <h1>Cookie Policy for robertbrunhage.com</h1>
        <p>
          This is the Cookie Policy for robertbrunhage.com, accessible from
          https://robertbrunhage.com/
        </p>
        <p>
          <strong>What Are Cookies</strong>
        </p>
        <p>
          As is common practice with almost all professional websites this site
          uses cookies, which are tiny files that are downloaded to your
          computer, to improve your experience. This page describes what
          information they gather, how we use it and why we sometimes need to
          store these cookies. We will also share how you can prevent these
          cookies from being stored however this may downgrade or "break"
          certain elements of the sites functionality.
        </p>
        <p>
          <strong>How We Use Cookies</strong>
        </p>
        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately
          in most cases there are no industry standard options for disabling
          cookies without completely disabling the functionality and features
          they add to this site. It is recommended that you leave on all cookies
          if you are not sure whether you need them or not in case they are used
          to provide a service that you use.
        </p>
        <p>
          <strong>Disabling Cookies</strong>
        </p>
        <p>
          You can prevent the setting of cookies by adjusting the settings on
          your browser (see your browser Help for how to do this). Be aware that
          disabling cookies will affect the functionality of this and many other
          websites that you visit. Disabling cookies will usually result in also
          disabling certain functionality and features of the this site.
          Therefore it is recommended that you do not disable cookies. This
          Cookies Policy was created with the help of the{" "}
          <a
            style={{ color: "#22E2E2" }}
            href="https://www.cookiepolicygenerator.com/cookie-policy-generator/"
          >
            Cookies Policy Generator from CookiePolicyGenerator.com
          </a>
          .
        </p>
        <p>
          <strong>The Cookies We Set</strong>
        </p>
        <ul>
          <li>
            <p>Site preferences cookies</p>
            <p>
              In order to provide you with a great experience on this site we
              provide the functionality to set your preferences for how this
              site runs when you use it. In order to remember your preferences
              we need to set cookies so that this information can be called
              whenever you interact with a page is affected by your preferences.
            </p>
          </li>
        </ul>
        <p>
          <strong>Third Party Cookies</strong>
        </p>
        <p>
          In some special cases we also use cookies provided by trusted third
          parties. The following section details which third party cookies you
          might encounter through this site.
        </p>
        <ul>
          <li>
            <p>
              We use adverts to offset the costs of running this site and
              provide funding for further development. The behavioural
              advertising cookies used by this site are designed to ensure that
              we provide you with the most relevant adverts where possible by
              anonymously tracking your interests and presenting similar things
              that may be of interest.
            </p>
          </li>
        </ul>
        <p>
          <strong>More Information</strong>
        </p>
        <p>
          Hopefully that has clarified things for you and as was previously
          mentioned if there is something that you aren't sure whether you need
          or not it's usually safer to leave cookies enabled in case it does
          interact with one of the features you use on our site.
        </p>

        <button
          style={{
            backgroundColor: "var(--primary-color)",
            color: "#fff",
            border: "none",
            padding: "1em",
            cursor: "pointer",
          }}
          onClick={() => resetCookieConsentValue()}
        >
          <a href="/"> Click here to revoke your cookies</a>
        </button>

        <p>
          For more general information on cookies, please read{" "}
          <a
            style={{ color: "#22E2E2" }}
            href="https://www.generateprivacypolicy.com/#cookies"
          >
            "Cookies" article from the Privacy Policy Generator
          </a>
          .
        </p>
        <p>
          However if you are still looking for more information then you can
          contact us through one of our preferred contact methods:
        </p>
        <p>Email: hello@robertbrunhage.com</p>
      </div>
    </Layout>
  );
};

export default cookie_policy;
