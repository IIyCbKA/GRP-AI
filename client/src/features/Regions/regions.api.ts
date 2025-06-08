import { apiClient } from "@/api/client";
import { ENDPOINT } from "@/api/config.enums";
import { RegionCreds } from "./regions.types";
import { getUrlWithParam } from "@/shared/utils";

export async function getRegions(): Promise<any> {
  const { data } = await apiClient.get(ENDPOINT.REGIONS);
  return data;
}

export async function getRegionData(creds: RegionCreds): Promise<any> {
  const url = getUrlWithParam(ENDPOINT.REGION_DATA, creds.regionID);
  const { data } = await apiClient.get(url);
  return data;
}
