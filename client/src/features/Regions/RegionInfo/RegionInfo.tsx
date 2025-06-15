import React from "react";
import styles from "./regionInfo.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedRegion } from "../regions.slice";
import { NON_SELECTED_TEXT } from "./regionInfo.constants";

function Content(): React.ReactElement {
  const selectedRegion = useAppSelector(selectSelectedRegion);

  if (selectedRegion === null)
    return <div className={styles.nonselectedContent}>{NON_SELECTED_TEXT}</div>;

  return <></>;
}

export default function RegionInfo(): React.ReactElement {
  return (
    <div className={styles.infoWrap}>
      <div className={styles.infoContent}>
        <Content />
      </div>
    </div>
  );
}
