import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Layout(): React.ReactElement {
  return (
    <div className={styles.rootContainer}>
      <Header />
      <div className={styles.contentWrap}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
