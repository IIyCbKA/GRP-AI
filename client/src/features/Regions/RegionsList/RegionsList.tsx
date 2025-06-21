import React from "react";
import styles from "./regionsList.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getRegionData,
  selectRegion,
  selectRegionsMap,
  selectRegionsStatus,
  selectSelectedRegion,
} from "../regions.slice";
import { Region, RegionID } from "../regions.types";
import Button from "@/components/Buttons/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
import { LoadStatus } from "@/features/Regions/regions.enums";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import classNames from "classnames";

function Content(): React.ReactElement {
  const regionsStatus = useAppSelector(selectRegionsStatus);
  const regionEntities = useAppSelector(selectRegionsMap);
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const dispatch = useAppDispatch();

  const onRegionClick: (regionID: RegionID) => void = (
    regionID: RegionID,
  ): void => {
    dispatch(selectRegion(regionID));
    dispatch(getRegionData(regionID));
  };

  if (regionsStatus === LoadStatus.LOADING)
    return <LoadingOverlay overlayType={"fullparent"} />;

  return (
    <>
      {Object.entries(regionEntities).map(
        ([regionID, regionData]: [RegionID, Region]): React.ReactElement => {
          const avatarTitle = regionData.name[0];
          const buttonStyles = classNames(styles.regionButton, {
            [styles.selectedRegionButton]: regionID === selectedRegion,
          });

          return (
            <Button
              key={regionID}
              fullWidth
              title={regionData.name}
              startIcon={{ content: <Avatar>{avatarTitle}</Avatar> }}
              className={buttonStyles}
              variant="text"
              onClick={(): void => onRegionClick(regionID)}
            >
              {regionData.name}
            </Button>
          );
        },
      )}
    </>
  );
}

export default function RegionsList(): React.ReactElement {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}>
        <Content />
      </div>
    </div>
  );
}
