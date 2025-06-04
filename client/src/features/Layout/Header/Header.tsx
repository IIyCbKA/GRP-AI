import React from "react";
import sharedLayoutStyles from "../shared/styles.module.css";
import styles from "./header.module.css";
import classNames from "classnames";
import Logotype from "./Logotype/Logotype";
import RegionCreator from "./RegionCreator/RegionCreator";
import ToggleMenu from "@/components/Buttons/ToggleMenu/ToggleMenu";
import Drawer from "@/components/Drawer/Drawer";

export default function Header(): React.ReactElement {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const onToggleClick: () => void = (): void => {
    setIsOpenMenu((prev: boolean): boolean => !prev);
  };

  const containerStyles = classNames(
    sharedLayoutStyles.layoutContainer,
    styles.headerContainer,
  );

  const contentStyles = classNames(
    sharedLayoutStyles.layoutContent,
    styles.headerContent,
  );

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <Logotype />
        <RegionCreator />
        <div className={styles.menuContainer}>
          <ToggleMenu isOverlay isOpen={isOpenMenu} onClick={onToggleClick} />
          <Drawer isOpen={isOpenMenu}></Drawer>
        </div>
      </div>
    </div>
  );
}
