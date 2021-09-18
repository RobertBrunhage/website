import React from "react";
import styles from "./layout.module.scss";
import Banner from "../banner/banner";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

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
