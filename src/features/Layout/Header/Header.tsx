import React from "react";
import sharedLayoutStyles from "../shared/styles.module.css";
import styles from "./header.module.css";
import classNames from "classnames";
import Logotype from "./Logotype/Logotype";

export default function Header(): React.ReactElement {
  const containerStyles = classNames(
    sharedLayoutStyles.layoutContainer,
    styles.headerContainer,
  );

  return (
    <div className={containerStyles}>
      <div className={sharedLayoutStyles.layoutContent}>
        <Logotype />
      </div>
    </div>
  );
}
