import React from "react";
import Banner from "../banner/banner";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Banner />
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
