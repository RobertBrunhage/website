import React from "react";
import styles from "./sideNavigation.module.scss";
import Link from "next/link";

interface MenuProps {
  chapter?: string;
  title: string;
  slug: string;
}

interface SideNavProps {
  menu: Array<MenuProps>;
  module: string;
  slug: string;
}

const SideNavigation = ({ menu, module, slug }: SideNavProps) => {
  return (
    <div className={styles.side_nav}>
      <ul>
        {menu.map((item, index) => (
          <>
            <li
              className={styles.chapter}
              style={{ display: item.chapter ? "" : "none" }}
            >
              {item.chapter}
            </li>
            <li
              className={`${styles.indent} ${
                item.slug === slug ? styles.selected : ""
              } }`}
              key={index}
            >
              <Link
                href={`/course/${module}/${item.slug}/`}
                as={`/course/${module}/${item.slug}/`}
              >
                {item.title}
              </Link>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigation;
