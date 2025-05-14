import React from "react";
import sharedLayoutStyles from "../shared/styles.module.css";
import styles from "./header.module.css";
import classNames from "classnames";
import Logotype from "./Logotype/Logotype";
import { PUBLIC_PATHS } from "@/routes/publicRoutes.constants";
import RegionCreator from "./RegionCreator/RegionCreator";

export default function Header(): React.ReactElement {
  const [isShowCreator, setShowCreator] = React.useState(false);

  const containerStyles = classNames(
    sharedLayoutStyles.layoutContainer,
    styles.headerContainer,
  );

  React.useEffect((): void => {
    setShowCreator(location.pathname === PUBLIC_PATHS.SELECT_REGION);
  }, [location.pathname]);

  return (
    <div className={containerStyles}>
      <div className={sharedLayoutStyles.layoutContent}>
        <Logotype />
        {isShowCreator && <RegionCreator />}
      </div>
    </div>
  );
}
