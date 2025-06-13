import { apiClient } from "@/api/client";
import { PATHS } from "@/api/config.constants";
import { RegionCreds, Region, RegionDTO } from "./regions.types";

export async function getRegions(): Promise<RegionDTO[]> {
  const { data } = await apiClient.get(PATHS.REGIONS);
  return data;
}

export async function getRegionData(creds: RegionCreds): Promise<Region> {
  const { data } = await apiClient.get(PATHS.REGION(creds.regionID));
  return data;
}
