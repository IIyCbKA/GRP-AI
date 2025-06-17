import { apiClient } from "@/api/client";
import { PATHS } from "@/api/config.constants";
import { Region, RegionDTO, RegionID } from "./regions.types";

export async function getRegions(): Promise<RegionDTO[]> {
  const { data } = await apiClient.get(PATHS.REGIONS);
  return data;
}

export async function getRegionData(regionID: RegionID): Promise<Region> {
  const { data } = await apiClient.get(PATHS.REGION(regionID));
  return data;
}
