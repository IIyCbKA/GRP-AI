import React from "react";
import styles from "./menu.module.css";
import sharedStyles from "@/shared/shared.module.css";
import ToggleMenu from "@/components/Buttons/ToggleMenu/ToggleMenu";
import Drawer from "@/components/Drawer/Drawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getRegionData,
  selectRegion,
  selectRegionsMap,
  selectRegionsStatus,
  selectSelectedRegion,
} from "@/features/Regions/regions.slice";
import { Region, RegionID } from "@/features/Regions/regions.types";
import Button from "@/components/Buttons/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
import { LoadStatus } from "@/features/Regions/regions.enums";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { ContentProps } from "./Menu.interface";
import { MENU_TITLE_TEXT } from "@/features/Layout/Header/Menu/Menu.constants";
import classNames from "classnames";

function Content({ onCloseMenu }: ContentProps): React.ReactElement {
  const regionsStatus = useAppSelector(selectRegionsStatus);
  const regionEntities = useAppSelector(selectRegionsMap);
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const dispatch = useAppDispatch();

  const onRegionClick: (regionID: RegionID) => void = (
    regionID: RegionID,
  ): void => {
    dispatch(selectRegion(regionID));
    dispatch(getRegionData(regionID));
    onCloseMenu();
  };

  const titleStyles = classNames(styles.menuTitle, sharedStyles.upperText);

  if (regionsStatus === LoadStatus.LOADING)
    return <LoadingOverlay overlayType={"fullparent"} />;

  return (
    <>
      <span className={titleStyles}>{MENU_TITLE_TEXT}</span>
      {Object.entries(regionEntities).map(
        ([regionID, regionData]: [RegionID, Region]): React.ReactElement => {
          const avatarTitle = regionData.name[0];
          const buttonStyles = classNames(styles.menuButton, {
            [styles.selectedMenuButton]: regionID === selectedRegion,
          });

          return (
            <Button
              key={regionID}
              fullWidth
              adornment={<Avatar>{avatarTitle}</Avatar>}
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

export default function Menu(): React.ReactElement {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const onToggleClick: () => void = (): void => {
    setIsOpenMenu((prev: boolean): boolean => !prev);
  };

  const onCloseMenu: () => void = (): void => {
    setIsOpenMenu(false);
  };

  return (
    <div className={styles.menuContainer}>
      <ToggleMenu isOverlay isOpen={isOpenMenu} onClick={onToggleClick} />
      <Drawer isOpen={isOpenMenu} className={styles.drawerContent}>
        <Content onCloseMenu={onCloseMenu} />
      </Drawer>
    </div>
  );
}
