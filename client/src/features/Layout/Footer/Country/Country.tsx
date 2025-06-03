import React from "react";
import { COUNTRY_TEXT } from "./country.constants";
import Russia from "@/assets/icons/russia_64x64.svg?react";
import styles from "./country.module.css";
import sharedStyles from "@/shared/shared.module.css";
import classNames from "classnames";

export default function Country(): React.ReactElement {
  const textStyle = classNames(styles.countryText, sharedStyles.lowerText);

  return (
    <div className={styles.countryWrap}>
      <div className={styles.countryImgWrap}>
        <Russia className={styles.countryImg} />
      </div>
      <div className={textStyle}>{COUNTRY_TEXT}</div>
    </div>
  );
}
