import React from "react";
import styles from "./regionsList.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectRegionsMap } from "../regions.slice";
import { Region, RegionID } from "../regions.types";
import Button from "@/components/Buttons/Button/Button";
import Avatar from "@/components/Avatar/Avatar";

export default function RegionsList(): React.ReactElement {
  const regionEntities = useAppSelector(selectRegionsMap);

  const onRegionClick: (regionID: RegionID) => void = (
    regionID: RegionID,
  ): void => {
    console.log(regionID);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}>
        {Object.entries(regionEntities).map(
          ([regionID, regionData]: [RegionID, Region]): React.ReactElement => {
            const avatarTitle = regionData.name[0];

            return (
              <Button
                key={regionID}
                fullWidth
                adornment={<Avatar>{avatarTitle}</Avatar>}
                className={styles.regionButton}
                variant="text"
                onClick={(): void => onRegionClick(regionID)}
              >
                {regionData.name}
              </Button>
            );
          },
        )}
      </div>
    </div>
  );
}
