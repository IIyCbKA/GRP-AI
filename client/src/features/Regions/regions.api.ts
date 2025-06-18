import { apiClient } from "@/api/client";
import { PATHS } from "@/api/config.constants";
import { RegionDTO, RegionID, RootDTO } from "./regions.types";

export async function getRoot(): Promise<RootDTO> {
  const { data } = await apiClient.get(PATHS.ROOT_INFO);
  return data;
}

export async function getRegionData(regionID: RegionID): Promise<RegionDTO> {
  const { data } = await apiClient.get(PATHS.REGION(regionID));
  return data;
}
