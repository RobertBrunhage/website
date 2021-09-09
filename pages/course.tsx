import Head from "next/head";
import queryString from "query-string";
import React, { useEffect } from "react";
import Cookie from "universal-cookie";
import info from "../components/cards/infoCard/info";
import InfoCard from "../components/cards/infoCard/infoCard";
import ModuleCard from "../components/cards/moduleCard/moduleCard";
import modules from "../components/cards/moduleCard/modules";
import FormInput from "../components/emailForm/formInput";
import questions from "../components/faq/course_faq";
import FAQ from "../components/faq/faq";
import Layout from "../components/layout/layout";
import Quote from "../components/quote/quote";
import { eventPropNewsletter, eventSignup } from "../core/constants";
import styles from "../styles/courses.module.scss";

const form_url =
  "https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca&amp;SIGNUP=FlutterMovieCourse";

const course = () => {
  const getAffcode = () => {
    const qs = queryString.parse(window.location.search);
    const affcode = qs.affcode;
    const cookie = new Cookie();
    const timestamp = new Date().getTime();
    const thirtydays = timestamp + 60 * 60 * 24 * 1000 * 30;
    const expireDate = new Date(thirtydays);

    if (affcode) {
      cookie.set("affcode", affcode, {
        sameSite: "none",
        secure: true,
        expires: expireDate,
      });
    }
  };

  useEffect(() => {
    getAffcode();
  }, []);

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
            <h1>Build a Production Ready Flutter App</h1>
            <h2>
              Learn how to develop high-quality Flutter applications. A curated
              learning session to fast-track your skills
            </h2>
            <div className={styles.form}>
              <h2>Coming Soon</h2>
              <p>
                Sign up to get updates and a <strong>big discount</strong> when
                the course launches as well as some behind the scenes content.
                <br />
                <br />
                The course will launch to the public 27th September
              </p>
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
              Have you used Flutter but want to get to the next level? <br />
              <br /> Tired of writing code that becomes messy, hard to manage,
              and want a streamlined way of building apps? <br />
              <br />
              <strong>I understand, I’ve been there!</strong>
              <br />
              <br /> I won't teach you how to use a Row or Column (you should
              already be familiar with that). Instead, I will teach you how to
              build robust applications from scratch.
              <br />
              <br />
              This course will give you the <strong>knowledge</strong> you need
              to build <strong>production-ready</strong> apps!
              <br />
              <br /> I'll guide you through the most important steps, such as
              building the UI, choosing the right architecture, handling errors,
              testing, and much more.
              <br />
              <br />
              This is an intermediate-level course. BUT if you have a basic
              knowledge of Flutter, then it is for you as well!
              <br />
              <br />
              Do you wish you were rich?
              <br /> Do you wish you were successful?
              <br />
              This course can't help with that!{" "}
              <strong>But it will teach you about state management 😎</strong>
            </p>
          </div>
        </section>
        <section className={styles.flutter_course}>
          <div className="max_width">
            <h1>The Ultimate Flutter Course</h1>
            <h2>Build a complete production-ready Flutter application</h2>
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
                quote={`Robert’s Ultimate Flutter Course is THE best 
                way to learn how to build production ready-applications. 
                Each lesson has a single purpose, that is easy to understand 
                and builds on the previous learnings. If you’re looking to 
                learn or improve your Flutter skills, then look no further.`}
                image={"/assets/images/james_perkins.png"}
                author={"James Perkins"}
              />
              <Quote
                quote={`I’ve had the luxury to take the course before release 
                and I am amazed at the level of quality and what I learn from it!`}
                image={"/assets/images/the_flutter_way.png"}
                author={"The Flutter Way"}
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
                or being a <strong>GDE in Flutter & Dart</strong>. Not too long
                ago, I also coded myself into corners, making code hard to
                manage, and was just lost in making it <strong>scalable</strong>
                .
              </p>
              <p>
                <strong>
                  I’ve been there but, that is also why I know how to get out of
                  it.
                </strong>{" "}
                I’ve learned from trial and error, consulting, teaching as well
                as working with other professionals!
              </p>
              <strong>
                Save time and frustration by learning an efficient system to
                build flutter applications.
              </strong>
            </div>
            <img
              className={styles.sprite}
              src="/assets/icons/sprite_fire.png"
              alt="amazed_man"
            />
          </div>
        </section>
        <section className={styles.wpt}>
          <div className={"max_width"}>
            <h2>What do people say about me?</h2>
            <div className={styles.quotes}>
              <Quote
                quote={
                  "A true Flutter expert. Robert knows the details of Flutter but also has the ability to explain it in an understandable way. Highly recommended."
                }
                image={"/assets/images/shannon_galway.png"}
                author={"Shannon Galway"}
              />
              <Quote
                quote={
                  "Thanks to Robert I’ve been able to rapidly go from a total novice programmer to now having 3 apps on both the App Store and Google Play store. If you want to excel at Flutter, Robert is your guy! He is an excellent teacher!"
                }
                image={"/assets/images/niklas_brodd.png"}
                author={"Niklas Brodd"}
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
              I made this course as the main goal of giving structure when
              learning Flutter. Instead of taking{" "}
              <strong>multiple months</strong> or <strong>even years</strong> to
              get to a <strong>solid understanding</strong>, the course will
              walk you through that, right away.
              <br />
              <br /> Learning things like{" "}
              <strong>Testing, Architecture, Animations</strong> are crucial for
              building good and reliable apps which is something that can be
              very hard to get right.
              <br />
              <br /> I’ve taught on YouTube with almost{" "}
              <strong>two million views</strong>, done consulting for{" "}
              <strong>businesses and clients</strong>. I've taken all this
              knowledge and created the course I wish I had when I started.
              <br />
              <br /> If I would teach this in a one-to-one meeting that would be
              up in the price range of <strong>$2500 or more</strong>.
              <br />
              <br /> The question always comes down to, how{" "}
              <strong>serious</strong> are you?
            </p>
          </div>
        </section>

        <section>
          <div className="max_width">
            <Quote
              quote={
                "Robert has put all the major topics that I teach about and, he has also done it in a very structured and high-quality way. Highly recommend it!"
              }
              image={"/assets/images/tadas_petra.png"}
              author={"Tadas Petra"}
            />
          </div>
        </section>

        <section>
          <div className={"max_width"}>
            <FAQ title={"Frequently Asked Questions"} questions={questions} />
          </div>
        </section>

        <section>
          <div className={`max_width ${styles.form}`}>
            <h2 style={{ textAlign: "center", marginTop: "0" }}>Coming Soon</h2>
            <p>
              Sign up to get updates and a <strong>big discount</strong> when
              the course launches as well as some behind the scenes content.
              <br />
              <br />
              The course will launch to the public 27th September
            </p>
            <FormInput
              giveaway={""}
              cta={"get updates"}
              color={"var(--secondary-bg-color)"}
              action={form_url}
              plausibleEvent={eventSignup}
              plausibleEventProp={eventPropNewsletter}
            />
          </div>
        </section>

        <section>
          <div className={`max_width ${styles.about}`}>
            <div>
              <p>
                I am super <strong>excited</strong> about what this course can
                teach you and I've spent multiple months designing, coding,
                creating the lectures, and all that fun!
              </p>
              <p>
                It has taken a lot of time to get this course out there but I am
                really <strong>happy</strong> I took the time to be able to
                share more of what I know with you all.
              </p>
              <p>
                I just want to thank you for taking the time to read this and
                hope you find the course to your <strong>liking!</strong>
              </p>
            </div>
            <img
              className={styles.sprite}
              src="/assets/icons/sprite_amazed.png"
              alt="amazed_man"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default course;
