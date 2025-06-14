import React from "react";
import styles from "./menu.module.css";
import ToggleMenu from "@/components/Buttons/ToggleMenu/ToggleMenu";
import Drawer from "@/components/Drawer/Drawer";
import { useAppSelector } from "@/store/hooks";
import { selectRegionsMap } from "@/features/Regions/regions.slice";
import { Region, RegionID } from "@/features/Regions/regions.types";
import Button from "@/components/Buttons/Button/Button";
import Avatar from "@/components/Avatar/Avatar";

export default function Menu(): React.ReactElement {
  const regionEntities = useAppSelector(selectRegionsMap);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const onToggleClick: () => void = (): void => {
    setIsOpenMenu((prev: boolean): boolean => !prev);
  };

  const onRegionClick: (regionID: RegionID) => void = (
    regionID: RegionID,
  ): void => {
    console.log(regionID);
  };

  return (
    <div className={styles.menuContainer}>
      <ToggleMenu isOverlay isOpen={isOpenMenu} onClick={onToggleClick} />
      <Drawer isOpen={isOpenMenu} className={styles.drawerContent}>
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
      </Drawer>
    </div>
  );
}
