import { LoadStatus } from "./regions.enums";
import { RootState } from "@/store/store";

/*
--------------RegionID type--------------
*/
export type RegionID = string;

/*
--------------RegionsSlice type--------------
regionsMap      - map of data about regions
selectedRegion  - selected region for demo
status          - status of load of regionsMap
error           - error getRegions log
*/
export type RegionsSlice = {
  regionsMap: RegionEntities;
  selectedRegion: RegionID | null;
  status: LoadStatus;
  error?: string;
};

/*
--------------RegionEntities type--------------
key         - id of region
value       - data about region
*/
export type RegionEntities = Record<RegionID, Region>;

/*
--------------Region type--------------
name       - name of region
createdAt  - created date
status     - status of load of region (filled in on client)
*/
export type Region = Omit<RegionDTO, "id"> & { status?: LoadStatus };

/*
--------------RegionDTO type--------------
id         - region id
name       - name of region
createdAt  - created date
*/
export type RegionDTO = {
  id: RegionID;
  name: string;
  createdAt: string;
};

/*
--------------RegionDataThunkCfg type--------------
state       - root redux app state
*/
export type RegionDataThunkCfg = { state: RootState };
