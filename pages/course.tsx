import React from "react";
import styles from "../styles/courses.module.scss";
import Head from "next/head";
import Layout from "../components/layout/layout";
import EmailCourse from "../components/emailForm/forms/emailCourse";
import FormInput from "../components/emailForm/formInput";
import FAQ from "../components/faq/faq";
import questions from "../components/faq/course_faq";
import { eventPropNewsletter, eventSignup } from "../core/constants";
import InfoCard from "../components/cards/infoCard/infoCard";
import ModuleCard from "../components/cards/moduleCard/moduleCard";
import PricingCard from "../components/cards/pricingCard/pricingCard";
import Quote from "../components/quote/quote";
import info from "../components/cards/infoCard/info";
import modules from "../components/cards/moduleCard/modules";
import {
  package_basic,
  package_complete,
  package_exclusive,
} from "../components/cards/pricingCard/packages";

const form_url =
  "https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca&amp;SIGNUP=FlutterMovieCourse";

const courses = () => {
  return (
    <Layout>
      <Head>
        <title>Robert Brunhage - Flutter, Dart, Firebase | Courses</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index" />
        <meta name="description" content="Flutter Courses | Robert Brunhage" />
        <meta property="og:url" content="https://robertbrunhage.com/course" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="RobertBrunhage.com" />
        <meta property="og:description" content="Flutter Courses" />
        <meta
          property="og:image"
          content="https://robertbrunhage.com/assets/images/course_twitter.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content="RobertBrunhage.com" />
        <meta
          property="twitter:description"
          content="Build a complete production ready Flutter application!"
        />
        <meta
          property="twitter:image"
          content="https://robertbrunhage.com/assets/images/course_twitter.png"
        />
        <link rel="prefetch" href="https://robertbrunhage.com/videos" />
        <link rel="canonical" href="https://robertbrunhage.com/course" />
      </Head>
      <div className={styles.container}>
        <section className={styles.header}>
          <div className="max_width">
            <h1>Build Production Ready Flutter Apps</h1>
            <h2>
              Learn how to develop high standard Flutter applications. A currated learning session
              to fast track your skills
            </h2>
            <div className={styles.form}>
              <FormInput
                giveaway={""}
                cta={"get updates"}
                color={"var(--primary-bg-color)"}
                action={form_url}
                plausibleEvent={eventSignup}
                plausibleEventProp={eventPropNewsletter}
              />
            </div>
          </div>
        </section>
        <section className={styles.introduction}>
          <div className={`max_width ${styles.intro_text}`}>
            <p>
              Have you used Flutter but wanted to take it to the next level? <br />
              <br /> Tired of building apps that becomes messy, hard to manage and want a
              streamlined way of building apps? <br />
              <br />
              <strong>I understand, I’ve been there!</strong>
              <br />
              <br /> This is not a course where I will go over how to use the basics such as a Row,
              Column and so on, but instead teach you how to build robust applications from scratch.
              <br />
              <br />
              What I teach in this course is <strong>knowledge</strong> that will take you from
              building something that just works to something that is <strong>robust</strong> and{" "}
              <strong>production ready</strong>!
              <br />
              <br /> Go from more simple concepts such as UI to the more complex layers such as
              architecture, error handing, testing and much more.
              <br />
              <br /> This is primirily targeted towards intermediates BUT if you have a base
              knowledge of Flutter then it is for you as well!
              <br />
              <br />
              Do you wish you were rich?
              <br /> Do you wish you were successful?
              <br />
              <strong>
                This course cant help with that! But it will teach you about state management 😎
              </strong>
            </p>
          </div>
        </section>
        <section className={styles.flutter_course}>
          <div className="max_width">
            <h1>The Ultimate Flutter Course</h1>
            <h2>Build a complete production ready Flutter application</h2>
            <img src={"/assets/icons/movie_course.svg"} />
            <div className={styles.form}>
              <FormInput
                giveaway={""}
                cta={"get updates"}
                color={"var(--primary-bg-color)"}
                action={form_url}
                plausibleEvent={eventSignup}
                plausibleEventProp={eventPropNewsletter}
              />
            </div>
          </div>
        </section>
        <section className={styles.wyg}>
          <div className={"max_width"}>
            <h2>What do you get?</h2>
            <div className={styles.cards}>
              {info.map((info) => (
                <InfoCard info={info.info} />
              ))}
            </div>

            <h2>Here is what people are saying about the course</h2>
            <div className={styles.quotes}>
              <Quote
                quote={
                  "Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly."
                }
                image={"/assets/images/avatar.png"}
                author={"Mr. Krabs."}
              />
              <Quote
                quote={
                  "Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly."
                }
                image={"/assets/images/avatar.png"}
                author={"Mr. Krabs."}
              />
            </div>

            <h2>What will you learn?</h2>
            <div className={styles.module_cards}>
              {modules.map((module, index) => (
                <ModuleCard
                  number={index + 1}
                  title={module.name}
                  description={module.description}
                />
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className={`max_width ${styles.about}`}>
            <div>
              <h2>Hey! 👋</h2>
              <p>
                I’m Robert Brunhage. You may know me by my{" "}
                <strong>
                  <a
                    href="https://youtube.com/robertbrunhage"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    YouTube channel
                  </a>
                </strong>{" "}
                or being a <strong>GDE in Flutter & Dart</strong> but not too long ago I also coded
                myself in to corners, making code hard to manage and was just lost in how to
                actually make it scalable.
              </p>
              <p>
                <strong>I’ve been there but that is also why I know how to get out of it.</strong>{" "}
                I’ve learned from trial and error, consulting, teaching as well as working with
                other professionals!
              </p>
              <strong>
                Save time and frustration and learn an efficient system to build flutter
                applications
              </strong>
            </div>
            <img
              className={styles.sprite}
              src="/assets/icons/Robert_amazed_FIRE.webp"
              alt="amazed_man"
            />
          </div>
        </section>
        <section className={styles.wpt}>
          <div className={"max_width"}>
            <h2>What do people think about the instructor?</h2>
            <div className={styles.quotes}>
              <Quote
                quote={
                  "Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly."
                }
                image={"/assets/images/avatar.png"}
                author={"Mr. Krabs."}
              />
              <Quote
                quote={
                  "Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly."
                }
                image={"/assets/images/avatar.png"}
                author={"Mr. Krabs."}
              />
            </div>
          </div>
        </section>
        <section className={styles.iirfm}>
          <div className={"max_width"}>
            <h3>
              Is it really for me?
              <br />
              <br />
            </h3>
            <p>
              I made this course as a main goal of giving structure when learning Flutter. Instead
              of taking <strong>multiple months</strong> or <strong>even years</strong> to get to a
              solid understanding the course will walk you through that, right away.
              <br />
              <br /> Learning things like <strong>Testing, Architecture, Animations</strong> are
              crucial for building good and reliable apps, and is something that can be very hard to
              get right.
              <br />
              <br /> I’ve tought on YouTube with almost <strong>two million views</strong>, done
              consulting for business and clients. I’ve taken what I teach{" "}
              <strong>business and clients</strong> in to a course so more people can get something
              out of it!
              <br />
              <br /> If I would teach this in a one to one meeting that would be up in the price
              range of <strong>$2500 or more</strong>.
              <br />
              <br /> The question always comes down to, how serious are you?
            </p>
          </div>
        </section>

        <section>
          <div className={`max_width ${styles.pricing}`}>
            <PricingCard
              className={styles.card}
              label={""}
              title={"basic package"}
              price={"$xx"}
              discounted_price={"$xx"}
              price_package={package_basic}
            />
            <PricingCard
              className={styles.card}
              label={"most popular"}
              title={"complete package"}
              price={"$xxx"}
              discounted_price={"$xxx"}
              price_package={package_complete}
            />
            <PricingCard
              className={styles.card}
              label={"best value"}
              title={"exclusive package"}
              price={"$xxx"}
              discounted_price={"$xxx"}
              price_package={package_exclusive}
            />
          </div>
        </section>

        <section>
          <div className={`max_width ${styles.satisfaction}`}>
            <img src="/assets/icons/satisfaction.png" alt="100% satisfaction" />
            <h2>
              100% Satisfaction Guarantee for <strong>30-days</strong>
            </h2>
            <p>
              After spending so much time on both this course and teaching over 3 years on YouTube
              and other areas I am confident that this will be worth it.
              <br />
              <br /> So if you are not happy with the course, for any reason, just reach out to me
              and I’ll issue a full refund.
              <br />
              <br />
              What is important for me is that you get knowledge that you can apply right away!
            </p>
          </div>
        </section>

        <section className={styles.wpt}>
          <div className={"max_width"}>
            <h2>Look at what past students have to say about this course</h2>
            <div className={styles.quotes}>
              <Quote
                quote={
                  "Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly."
                }
                image={"/assets/images/avatar.png"}
                author={"Mr. Krabs."}
              />
              <Quote
                quote={
                  "Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly."
                }
                image={"/assets/images/avatar.png"}
                author={"Mr. Krabs."}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={"max_width"}>
            <FAQ title={"Frequently Asked Questions"} questions={questions} />
          </div>
        </section>

        <section>
          <div className={`max_width ${styles.pricing}`}>
            <PricingCard
              className={styles.card}
              label={""}
              title={"basic package"}
              price={"$xx"}
              discounted_price={"$xx"}
              price_package={package_basic}
            />
            <PricingCard
              className={styles.card}
              label={"most popular"}
              title={"complete package"}
              price={"$xxx"}
              discounted_price={"$xxx"}
              price_package={package_complete}
            />
            <PricingCard
              className={styles.card}
              label={"best value"}
              title={"exclusive package"}
              price={"$xxx"}
              discounted_price={"$xxx"}
              price_package={package_exclusive}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default courses;
