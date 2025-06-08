import React from "react";
import styles from "./regionInfo.module.css";

export default function RegionInfo(): React.ReactElement {
  return (
    <div className={styles.infoWrap}>
      <div className={styles.infoContent}></div>
    </div>
  );
}
