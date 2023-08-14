import Image from "next/image";

import { useRouter } from "next/router";
import styles from "./blogShareFooter.module.scss";
import twitterImage from "../../../public/assets/icons/twitter.svg";

interface BlogShareFooterProps {
  message: String;
}

const BlogShareFooter = ({ message }: BlogShareFooterProps) => {
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
        <Image src={twitterImage} width={38} height={38} alt={"twitter"} />
        Share it on Twitter!
      </a>
    </div>
  );
};

export default BlogShareFooter;
