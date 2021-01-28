import React, { useRef } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Menu from "./menuItems.js";

const Navbar = () => {
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const toggleMobileMenu = () => mobileMenuRef.current?.classList.toggle(styles.active);
  return (
    <header className={styles.header}>
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
