import React from "react";
import styles from "./regionsList.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectRegionsMap } from "../regions.slice";
import { Region } from "../regions.types";
import Button from "@/components/Buttons/Button/Button";
import { ButtonVariant } from "@/components/Buttons/Button/button.enums";

export default function RegionsList(): React.ReactElement {
  const regionEntities = useAppSelector(selectRegionsMap);

  const onRegionClick: (regionID: string) => void = (
    regionID: string,
  ): void => {
    console.log(regionID);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}>
        {Object.entries(regionEntities).map(
          ([regionID, regionData]: [string, Region]): React.ReactElement => (
            <Button
              key={regionID}
              fullWidth
              variant={ButtonVariant.Text}
              onClick={(): void => onRegionClick(regionID)}
            >
              {regionData.name}
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
