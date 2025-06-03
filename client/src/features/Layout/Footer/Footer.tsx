import React from "react";
import sharedLayoutStyles from "../shared/styles.module.css";
import styles from "./footer.module.css";
import Copyright from "./Copyright/Copyright";
import Country from "./Country/Country";
import classNames from "classnames";

export default function Footer(): React.ReactElement {
  const containerStyles = classNames(
    sharedLayoutStyles.layoutContainer,
    styles.footerContainer,
  );

  const contentStyles = classNames(
    sharedLayoutStyles.layoutContent,
    styles.footerContent,
  );

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <Copyright />
        <Country />
      </div>
    </div>
  );
}
