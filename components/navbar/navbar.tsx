import React, { useRef } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Menu from "./menuItems.js";
import Head from "next/head";

const Navbar = () => {
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const toggleMobileMenu = () => mobileMenuRef.current?.classList.toggle(styles.active);
  return (
    <header className={styles.header}>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="robots" content="index" />
        <meta name="keywords" content="Flutter, Firebase, Dart, Youtube, Robert Brunhage, Tips, App, Courses, Videos" />

        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon-180x180.png" />
        <meta name="theme-color" content="#C34C4C" />
      </Head>
      <nav /* className="max_width" */>
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
            <li>
              <Link href={item.url} key={index}>
                {item.title}
              </Link>
            </li>
          ))}
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
