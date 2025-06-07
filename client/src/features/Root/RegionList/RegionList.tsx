import React from "react";
import styles from "./regionList.module.css";

export default function RegionList(): React.ReactElement {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}></div>
    </div>
  );
}
