import React from 'react';
import styles from './sideNavigation.module.scss';
import Link from 'next/link';

export interface MenuProps {
  chapter?: string;
  title: string;
  slug: string;
  weight: number;
  free?: boolean;
  seen?: boolean;
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
          <React.Fragment key={index}>
            <li
              className={styles.chapter}
              style={{ display: item.chapter ? '' : 'none' }}
            >
              {item.chapter}
            </li>
            <li
              id={item.slug}
              className={`${styles.indent} ${
                item.slug === slug ? styles.selected : ''
              } }`}
            >
              <Link
                className={styles.link}
                href={`/courses/${module}/${item.slug}/`}
                as={`/courses/${module}/${item.slug}/`}
              >
                <span className={item.free ? (item.seen ? styles.seen : styles.free) : styles.locked} />
                {item.title}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigation;
