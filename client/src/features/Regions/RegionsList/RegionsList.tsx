import React from "react";
import styles from "./regionsList.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectRegionsMap } from "../regions.slice";
import { RegionData } from "../regions.types";
import Button from "@/components/Buttons/Button/Button";
import { ButtonVariant } from "@/components/Buttons/Button/button.enums";

export default function RegionsList(): React.ReactElement {
  const regionsMap = useAppSelector(selectRegionsMap);

  const onRegionClick: (regionID: string) => void = (
    regionID: string,
  ): void => {
    console.log(regionID);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}>
        {Object.entries(regionsMap).map(
          ([regionID, regionData]: [
            string,
            RegionData,
          ]): React.ReactElement => (
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
