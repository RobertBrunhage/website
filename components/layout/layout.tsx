import React, { useRef } from "react";
import Navbar from "../navbar/navbar";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={`max_width ${styles.main}`}>{children}</main>
    </>
  );
};

export default Layout;
