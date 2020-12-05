import React from "react";
import styles from "./layout.module.scss";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="max_width">
      <header className={styles.header}>
        <img alt="logo" src="/logo.png" />
        <ul>
          <li>
            <a>
              <img src="/assets/icons/twitter.png" />
            </a>
          </li>
          <li>
            <a>
              <img src="/assets/icons/discord.png" />
            </a>
          </li>
          <li>
            <a>
              <img src="/assets/icons/youtube.png" />
            </a>
          </li>
          <li>
            <a>
              <img src="/assets/icons/patreon.png" />
            </a>
          </li>
        </ul>
        <nav>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/videos"}>Videos</Link>
            </li>
{/*             <li>
              <Link href={"/courses"}>Courses</Link>
            </li> */}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
