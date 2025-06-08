import React from "react";
import styles from "./regionsList.module.css";

export default function RegionsList(): React.ReactElement {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}></div>
    </div>
  );
}
