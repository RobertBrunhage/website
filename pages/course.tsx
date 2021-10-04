import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { default as Cookie, default as Cookies } from "universal-cookie";
import CTA from "../components/buttons/cta/cta";
import info from "../components/cards/infoCard/info";
import InfoCard from "../components/cards/infoCard/infoCard";
import ModuleCard from "../components/cards/moduleCard/moduleCard";
import modules from "../components/cards/moduleCard/modules";
import {
  package_basic,
  package_complete,
  package_exclusive,
} from "../components/cards/pricingCard/packages";
import PricingCard from "../components/cards/pricingCard/pricingCard";
import questions from "../components/faq/course_faq";
import FAQ from "../components/faq/faq";
import Layout from "../components/layout/layout";
import Quote from "../components/quote/quote";
import Timer from "../components/timer/timer";
import styles from "../styles/courses.module.scss";

const course = () => {
  const [affcode, setAffcode] = useState(String);

  const purchase_link = "https://courses.robertbrunhage.com/purchase";
  const basic_package = "?product_id=3401896";
  const complete_package = "?product_id=3401914";
  const exclusive_package = "?product_id=3401916";

  const coupon_code = "7-DAY-SALE";

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

  const setAffiliateCode = () => {
    const cookies = new Cookies();
    const affcode = cookies.get("affcode");
    if (affcode) {
      setAffcode(affcode);
    }
  };

  useEffect(() => {
    getAffcode();
    setAffiliateCode();
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Ultimate Flutter Course</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index" />
        <meta name="description" content="Flutter Courses | Robert Brunhage" />
        <meta property="og:url" content="https://robertbrunhage.com/course" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Ultimate Flutter Course" />
        <meta
          property="og:description"
          content="Build a complete production-ready Flutter application!"
        />
        <meta
          property="og:image"
          content="https://robertbrunhage.com/assets/images/course_twitter.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content="Ultimate Flutter Course" />
        <meta
          property="twitter:description"
          content="Build a complete production-ready Flutter application!"
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
            <h1>Build a Production-ready Flutter App</h1>
            <h3>A curated learning session to fast track your skills</h3>
            <iframe
              style={{
                margin: "60px auto 60px auto",
                display: "block",
                borderRadius: "8px",
                maxWidth: "100%",
                height: "100%",
                aspectRatio: "16/9",
              }}
              width="800"
              height="450"
              src="https://www.youtube.com/embed/fgsrprBJQHM"
              title="Testimonial"
              frameBorder={0}
            ></iframe>
            <CTA
              text="enroll"
              href={"#pricing"}
              target={""}
              width={"25em"}
              animation={false}
              center={true}
            />
          </div>
        </section>
        <section className={styles.introduction}>
          <div data-aos="fade" className={`max_width ${styles.intro_text}`}>
            <p>
              Have you used Flutter but want to get to the next level? <br />
              <br /> Tired of writing code that becomes messy, hard to manage,
              and want a streamlined way of building apps? <br />
              <br />
              <strong>I understand, I’ve been there!</strong>
              <br />
              <br /> I won't teach you how to use a Row or Column (you should
              already be familiar with that). Instead, you will learn how to
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
              <br />I don't aim this to be a long length course. The speed of
              which I teach will be quite high so <strong>don't</strong> expect
              tons of hours of content which you might be used with from other
              courses.
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
          <div data-aos="fade" className="max_width">
            <h1>The Ultimate Flutter Course</h1>
            <h2>Build a complete production-ready Flutter application</h2>
            <img src={"/assets/icons/movie_course.svg"} />
            <CTA
              text="enroll"
              href={"#pricing"}
              target={""}
              width={"25em"}
              animation={false}
              center={true}
            />
          </div>
        </section>
        <section className={styles.wyg}>
          <div className={"max_width"}>
            <h2>What do you get?</h2>
            <div data-aos="fade" className={`${styles.cards}`}>
              {info.map((info, index) => (
                <InfoCard key={index} info={info.info} />
              ))}
            </div>

            <h2>Here is what people are saying about the course</h2>
            <div data-aos="fade" className={styles.quotes}>
              <Quote
                quote={
                  "Robert’s Ultimate Flutter Course is THE best way to learn how to build production ready-applications. Each lesson has a single purpose, that is easy to understand and builds on the previous learnings.\n\nIf you’re looking to learn or improve your Flutter skills, then look no further."
                }
                image={"/assets/images/james_perkins.png"}
                author={"James Perkins"}
              />
              <Quote
                quote={
                  "This course covers all the important concepts and techniques needed to build production-ready apps, and delivers them in a fun and engaging way. \n\nIf you're serious about Flutter app development, this is an excellent resource!"
                }
                image={"/assets/images/andrea_bizzotto.png"}
                author={"Andrea Bizzotto"}
              />
            </div>

            <h2>What will you learn?</h2>
            <div data-aos="fade" className={styles.module_cards}>
              {modules.map((module, index) => (
                <ModuleCard
                  key={index}
                  number={`${index + 1}`}
                  title={module.name}
                  description={module.description}
                />
              ))}
              <ModuleCard
                number={"B"}
                title={"Bonus module"}
                description={
                  "Depending on feedback during the course we will add more content here such as automated testing and so on"
                }
              />
            </div>
          </div>
        </section>
        <section>
          <div data-aos="fade" className={`max_width ${styles.about}`}>
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
                manage, and was lost in making it <strong>scalable</strong>.
              </p>
              <p>
                <strong>
                  I’ve been there but, that is also why I know how to get out of
                  it.
                </strong>{" "}
                I’ve learned from trial and error, consulting, teaching, as well
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
          <div data-aos="fade" className={"max_width"}>
            <h2>What do people say about me?</h2>
            <div className={styles.quotes}>
              <Quote
                quote={
                  "A true Flutter expert. Robert knows the details of Flutter but also has the ability to explain it in an understandable way. \n\nHighly recommended."
                }
                image={"/assets/images/shannon_galway.png"}
                author={"Shannon Galway"}
              />
              <Quote
                quote={
                  "Thanks to Robert I’ve been able to rapidly go from a total novice programmer to now having 3 apps on both the App Store and Google Play store. \n\nIf you want to excel at Flutter, Robert is your guy! He is an excellent teacher!"
                }
                image={"/assets/images/niklas_brodd.png"}
                author={"Niklas Brodd"}
              />
            </div>
          </div>
        </section>
        <section id="pricing" className={styles.iirfm}>
          <div data-aos="fade" className={"max_width"}>
            <h3>
              Is it really for me?
              <br />
              <br />
            </h3>
            <p>
              I made this course with the main goal of giving structure when
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
              <br /> If I would teach this in one on one meetings, that would be
              up in the price range of <strong>$2500 or more</strong>.
              <br />
              <br /> The question always comes down to, how{" "}
              <strong>serious</strong> are you?
            </p>
          </div>
        </section>
        <section>
          <div className={"max_width"}>
            <div className={styles.pricing}>
              <PricingCard
                className={styles.card}
                title={"basic package"}
                price={"$149"}
                discounted_price={"$129"}
                price_package={package_basic}
                href={`${purchase_link}${basic_package}&coupon_code=${coupon_code}&affcode=${affcode}`}
                saturation={"50%"}
              />
              <PricingCard
                className={styles.card}
                label={"most popular"}
                title={"complete package"}
                price={"$199"}
                discounted_price={"$149"}
                price_package={package_complete}
                href={`${purchase_link}${complete_package}&coupon_code=${coupon_code}&affcode=${affcode}`}
              />
              <PricingCard
                className={styles.card}
                label={"best value"}
                title={"exclusive package"}
                price={"$499"}
                discounted_price={"$399"}
                price_package={package_exclusive}
                href={""}
                supply={"Out of stock"}
                saturation={"0"}
                disabled={true}
              />
            </div>
          </div>
        </section>
        <section>
          <div className={`max_width ${styles.satisfaction}`}>
            <img src="/assets/icons/satisfaction.png" alt="100% satisfaction" />
            <h2>
              100% Satisfaction Guarantee for <strong>30-days</strong>
            </h2>
            <p>
              After spending so much time on both this course and teaching over
              3 years on YouTube and other areas I am confident that this will
              be worth it.
              <br />
              <br /> So if you are not happy with the course, for any reason,
              just reach out to me and I’ll issue a full refund.
              <br />
              <br />
              What is important for me is that you get knowledge that you can
              apply right away!
            </p>
          </div>
        </section>
        <section>
          <div data-aos="fade" className="max_width">
            <iframe
              style={{
                margin: "0 auto 60px auto",
                display: "block",
                borderRadius: "8px",
                maxWidth: "100%",
                height: "100%",
                aspectRatio: "16/9",
              }}
              width="800"
              height="450"
              src="https://www.youtube.com/embed/_CNzUE5kmVk?rel=0"
              title="Testimonial"
              frameBorder={0}
            ></iframe>
            <Quote
              quote={
                "Robert has put all the major topics that I teach about and, he has also done it in a very structured and high-quality way. \n\nHighly recommend it!"
              }
              image={"/assets/images/tadas_petra.png"}
              author={"Tadas Petra"}
            />
            <div style={{ marginTop: "6em" }} />
            <Quote
              quote={
                "Great people are rare in this world and, Robert is one of them. Why? Because he enjoys sharing, helping others, and constantly improve for the better. \n\nRobert is a trusty person. We can see that in everything he does, he gives 110%."
              }
              image={"/assets/images/flutter_mapp.png"}
              author={"Flutter Mapp"}
            />
          </div>
        </section>
        <section>
          <div data-aos="fade" className={"max_width"}>
            <FAQ title={"Frequently Asked Questions"} questions={questions} />
          </div>
        </section>
        <section>
          <div className={`max_width ${styles.pricing}`}>
            <PricingCard
              className={styles.card}
              label={""}
              title={"basic package"}
              price={"$149"}
              discounted_price={"$129"}
              price_package={package_basic}
              href={`${purchase_link}${basic_package}&coupon_code=${coupon_code}&affcode=${affcode}`}
              saturation={"50%"}
            />
            <PricingCard
              className={styles.card}
              label={"most popular"}
              title={"complete package"}
              price={"$199"}
              discounted_price={"$149"}
              price_package={package_complete}
              href={`${purchase_link}${complete_package}&coupon_code=${coupon_code}&affcode=${affcode}`}
            />
            <PricingCard
              className={styles.card}
              label={"best value"}
              title={"exclusive package"}
              price={"$499"}
              discounted_price={"$399"}
              price_package={package_exclusive}
              href={""}
              supply={"Out of stock"}
              saturation={"0"}
              disabled={true}
            />
          </div>
        </section>
        <section>
          <div data-aos="fade" className={`max_width ${styles.about}`}>
            <div>
              <p>
                I am super <strong>excited</strong> about what this course can
                teach you and I've spent multiple months designing, coding,
                creating the lectures!
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
