import React, { useRef } from "react";
import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={`max_width ${styles.main}`}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
