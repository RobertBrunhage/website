import React, { useRef } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
