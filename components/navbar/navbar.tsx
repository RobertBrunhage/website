import React, { useRef } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "./menuItems";
import Head from "next/head";

const Navbar = () => {
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const toggleMobileMenu = () =>
    mobileMenuRef.current?.classList.toggle(styles.active);

  const router = useRouter();

  const setLightTheme = () => {
    document.body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  };
  const setDarkTheme = () => {
    document.body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  };

  return (
    <header className={styles.header}>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="robots" content="index" />
        <meta
          name="keywords"
          content="Flutter, Firebase, Dart, Youtube, Robert Brunhage, Tips, App, Courses, Videos"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon-180x180.png" />
        <meta name="theme-color" content="#E12339" />
      </Head>
      <nav className={styles.stroke} id={"nav"}>
        <h1 className={styles.logo}>
          <Link href="/">
            <a>
              <img alt="logo" src="/logo.png" />
              Robert Brunhage
            </a>
          </Link>
        </h1>

        <ul ref={mobileMenuRef} className={styles.navItems}>
          {Menu.map((item, index) => (
            <li key={index}>
              <Link href={item.url} key={index}>
                <a className={router.pathname == item.url ? styles.active : ""}>
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
          <button onClick={setDarkTheme} style={{ display: "none" }}>
            dark
          </button>
          <button onClick={setLightTheme} style={{ display: "none" }}>
            light
          </button>
        </ul>

        <div className={styles.mobileMenu} onClick={() => toggleMobileMenu()}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
