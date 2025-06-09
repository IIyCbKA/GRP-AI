import { apiClient } from "@/api/client";
import { PATHS } from "@/api/config.constants";
import { RegionCreds, RegionData, RegionsMap } from "./regions.types";

export async function getRegions(): Promise<RegionsMap> {
  const { data } = await apiClient.get(PATHS.REGIONS);
  return data;
}

export async function getRegionData(creds: RegionCreds): Promise<RegionData> {
  const { data } = await apiClient.get(PATHS.REGION(creds.regionID));
  return data;
}
