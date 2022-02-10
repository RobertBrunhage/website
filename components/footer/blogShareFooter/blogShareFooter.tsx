import { useRouter } from "next/router";
import React from "react";
import styles from "./blogShareFooter.module.scss";

interface BlogShareFooterProps {
  message: String;
}

const blogShareFooter = ({ message }: BlogShareFooterProps) => {
  const router = useRouter();
  const generateTwitterUrl = () => {
    const currentUrl = router.asPath;
    const messageWithoutSpace = message.replace(/\s/g, "%20");
    const url = `https://twitter.com/intent/tweet?url=https://robertbrunhage.com${currentUrl}%2F&text=${messageWithoutSpace}`;
    return url;
  };

  return (
    <div className={styles.container}>
      <a href={generateTwitterUrl()} rel="noopener noreferrer" target="_blank">
        <img
          src={"/assets/icons/twitter.svg"}
          width={38}
          height={38}
          alt={"twitter"}
        />
        Share it on Twitter!
      </a>
    </div>
  );
};

export default blogShareFooter;
