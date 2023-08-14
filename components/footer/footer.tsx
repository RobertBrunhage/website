import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./footer.module.scss";
import Socials from "./socials";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.issue}>
        Find an issue with this page?{" "}
        <a
          href="https://github.com/RobertBrunhage/website/issues"
          rel="noopener noreferrer"
          target="_blank"
        >
          Post it on GitHub!
        </a>
      </p>

      <Link href="/cookie_policy"> Cookie Policy</Link>

      <p className={styles.copyright}>
        Copyright &copy; {year} Robert Brunhage
      </p>

      <ul className={styles.socials}>
        {Socials.map((item, index) => (
          <li key={index}>
            <a href={item.href} rel="noopener noreferrer" target="_blank">
              <Image src={item.img} width={38} height={38} alt={item.alt} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
