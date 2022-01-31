import { useRouter } from "next/router";
import React from "react";
import styles from "./blogShareFooter.module.scss";
import ShareSocials from "./shareSocials";

interface BlogShareFooterProps {
  message: String;
}

const blogShareFooter = ({ message }: BlogShareFooterProps) => {
  const router = useRouter();
  const generateTwitterUrl = () => {
    console.log(message);
    const currentUrl = router.asPath;
    const messageWithoutSpace = message.replace(/\s/g, "%20");
    const url = `https://twitter.com/intent/tweet?url=https://robertbrunhage.com${currentUrl}%2F&text=${messageWithoutSpace}`;
    return url;
  };

  return (
    <div className={styles.container}>
      <h2>Share it on Twitter!</h2>
      <ul>
        {ShareSocials.map((item, index) => (
          <li key={index}>
            <a
              href={generateTwitterUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={item.img} alt={item.alt} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default blogShareFooter;
