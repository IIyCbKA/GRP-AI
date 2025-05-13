import React from "react";
import { COPYRIGHT_TEXT } from "./copyright.constants";
import styles from "./copyright.module.css";
import sharedStyles from "@/shared/shared.module.css";
import classNames from "classnames";

export default function Copyright(): React.ReactElement {
  const textStyles = classNames(styles.copyrightWrap, sharedStyles.lowerText);

  return <div className={textStyles}>{COPYRIGHT_TEXT}</div>;
}
