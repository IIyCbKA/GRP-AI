import React from "react";
import styles from "./menu.module.css";
import ToggleMenu from "@/components/Buttons/ToggleMenu/ToggleMenu";
import Drawer from "@/components/Drawer/Drawer";
import { useAppSelector } from "@/store/hooks";
import {
  selectRegionsMap,
  selectRegionsStatus,
} from "@/features/Regions/regions.slice";
import { Region, RegionID } from "@/features/Regions/regions.types";
import Button from "@/components/Buttons/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
import { LoadStatus } from "@/features/Regions/regions.enums";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

function Content(): React.ReactElement {
  const regionsStatus = useAppSelector(selectRegionsStatus);
  const regionEntities = useAppSelector(selectRegionsMap);

  const onRegionClick: (regionID: RegionID) => void = (
    regionID: RegionID,
  ): void => {
    console.log(regionID);
  };

  if (regionsStatus === LoadStatus.LOADING)
    return <LoadingOverlay overlayType={"fullparent"} />;

  return (
    <>
      {Object.entries(regionEntities).map(
        ([regionID, regionData]: [RegionID, Region]): React.ReactElement => {
          const avatarTitle = regionData.name[0];

          return (
            <Button
              key={regionID}
              fullWidth
              adornment={<Avatar>{avatarTitle}</Avatar>}
              className={styles.menuButton}
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

export default function Menu(): React.ReactElement {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const onToggleClick: () => void = (): void => {
    setIsOpenMenu((prev: boolean): boolean => !prev);
  };

  return (
    <div className={styles.menuContainer}>
      <ToggleMenu isOverlay isOpen={isOpenMenu} onClick={onToggleClick} />
      <Drawer isOpen={isOpenMenu} className={styles.drawerContent}>
        <Content />
      </Drawer>
    </div>
  );
}
