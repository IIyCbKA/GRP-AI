import { LoadStatus } from "./regions.enums";

/*
--------------RegionsSlice type--------------
regionsMap      - map of data about regions
selectedRegion  - selected region for demo
status          - status of load of regionsMap
error           - error getRegions log
*/
export interface RegionsSlice {
  regionsMap: RegionsMap;
  selectedRegion: number | null;
  status: LoadStatus;
  error?: string;
}

/*
--------------RegionsMap type--------------
key         - id of region
value       - data about region
*/
export interface RegionsMap {
  [regionID: string]: RegionData;
}

/*
--------------RegionData type--------------
name    - name of region
other...
status  - status of load of region (filled in on client)
*/
export interface RegionData {
  name: string;
  /* other vars */
  status?: LoadStatus;
}

/*
--------------RegionCreds type--------------
regionID  - ID of region for loading
*/
export interface RegionCreds {
  regionID: string;
}
