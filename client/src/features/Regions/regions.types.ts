import { LoadStatus } from "./regions.enums";
import { RootState } from "@/store/store";

export type RegionID = string;
export type ParameterID = string;

/*
--------------RegionsSlice type--------------
regionsMap        - map of data about regions
parametersMap     - map of data about parameters
selectedRegion    - selected region for demo
status            - status of load of regionsMap and parametersMap
error             - error getRegions log
*/
export type RegionsSlice = {
  regionsMap: RegionEntities;
  parametersMap: ParameterEntities;
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

/*
--------------ParameterDTO type--------------
id         - parameter id
name       - name of parameter
measure    - measure of parameter
*/
export type ParameterDTO = {
  id: ParameterID;
  name: string;
  measure: string;
};

/*
--------------Parameter type--------------
name       - name of parameter
measure    - measure of parameter
*/
export type Parameter = Omit<ParameterDTO, "id">;

/*
--------------ParameterEntities type--------------
key         - id of parameter
value       - data about parameter
*/
export type ParameterEntities = Record<ParameterID, Parameter>;

/*
--------------RootDTO type--------------
regions     - list of all regions
parameters  - list of all parameters
*/
export type RootDTO = {
  regions: RegionDTO[];
  parameters: ParameterDTO[];
};

/*
--------------RootEntities type--------------
regions     - object of all regions
parameters  - object of all parameters
*/
export type RootEntities = {
  regions: RegionEntities;
  parameters: ParameterEntities;
};
