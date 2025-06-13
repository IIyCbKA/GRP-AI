import React from "react";
import RegionsList from "./RegionsList/RegionsList";
import RegionInfo from "./RegionInfo/RegionInfo";
import { useAppDispatch } from "@/store/hooks";
import { getAllRegions } from "./regions.slice";

export default function Regions(): React.ReactElement {
  const dispatch = useAppDispatch();

  React.useEffect((): void => {
    dispatch(getAllRegions());
  }, [dispatch]);

  return (
    <>
      <RegionsList />
      <RegionInfo />
    </>
  );
}
