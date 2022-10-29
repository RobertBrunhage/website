import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Menu, { NavItem } from "./menuItems";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const toggleMobileMenu = () =>
    mobileMenuRef.current?.classList.toggle(styles.active);

  const router = useRouter();
  const { data: session } = useSession();

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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
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
            <NavItemComponent
              key={index}
              index={index}
              navItem={item}
              pathname={router.pathname}
            />
          ))}
          
          {!session ? (
            <button onClick={() => signIn()}>Sign In</button>
          ) : (
            <button onClick={() => signOut()}>Sign Out</button>
          )}

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

interface NavItemComponentProps {
  navItem: NavItem;
  index: number;
  pathname: string;
}

const NavItemComponent = ({
  navItem,
  index,
  pathname,
}: NavItemComponentProps) => {
  return (
    <li key={index}>
      <Link href={navItem.url} key={index}>
        <a className={pathname == navItem.url ? styles.active : ""}>
          {navItem.title}
        </a>
      </Link>
    </li>
  );
};

export default Navbar;
