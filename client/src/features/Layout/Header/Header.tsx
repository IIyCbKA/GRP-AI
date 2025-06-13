import React from "react";
import sharedLayoutStyles from "../shared/styles.module.css";
import styles from "./header.module.css";
import classNames from "classnames";
import Logotype from "./Logotype/Logotype";
import Menu from "./Menu/Menu";

export default function Header(): React.ReactElement {
  const containerStyles = classNames(
    sharedLayoutStyles.layoutContainer,
    styles.headerContainer,
  );

  const contentStyles = classNames(
    sharedLayoutStyles.layoutContent,
    styles.headerContent,
  );

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <Logotype />
        <Menu />
      </div>
    </div>
  );
}
