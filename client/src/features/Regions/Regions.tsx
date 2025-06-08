import React from "react";
import RegionsList from "./RegionsList/RegionsList";
import RegionInfo from "./RegionInfo/RegionInfo";

export default function Regions(): React.ReactElement {
  return (
    <>
      <RegionsList />
      <RegionInfo />
    </>
  );
}
