import React from "react";
import RegionsList from "./RegionsList/RegionsList";
import RegionInfo from "./RegionInfo/RegionInfo";
import { useAppDispatch } from "@/store/hooks";
import { getRegionsMap } from "./regions.slice";

export default function Regions(): React.ReactElement {
  const dispatch = useAppDispatch();

  React.useEffect((): void => {
    dispatch(getRegionsMap());
  }, [dispatch]);

  return (
    <>
      <RegionsList />
      <RegionInfo />
    </>
  );
}
