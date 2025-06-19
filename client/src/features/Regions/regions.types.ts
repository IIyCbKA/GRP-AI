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
data       - data of region
createdAt  - created date
status     - status of load of region (filled in on client)
*/
export type Region = {
  name: string;
  data: RegionDataEntity[];
  createdAt: string;
  status?: LoadStatus;
};

/*
--------------RegionDTO type--------------
id         - region id
name       - name of region
data       - data of region
createdAt  - created date
*/
export type RegionDTO = {
  id: RegionID;
  name: string;
  data: RegionDataDTO[];
  created_at: string;
};

/*
--------------RegionDataDTO type--------------
*/
export type RegionDataDTO = {
  id: number;
  region_id: number;
  parameter_id: number;
  value: number;
  year: number;
};

/*
--------------RegionDataEntity type--------------
*/
export type RegionDataEntity = {
  id: number;
  regionID: number;
  parameterID: number;
  value: number;
  year: number;
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

/*
--------------ChartData type--------------
key    - parameterID
value  - list of Entity for chart
*/
export type ChartData = Record<string, EntityChartData[]>;

/*
--------------EntityChartData type--------------
*/
export type EntityChartData = {
  year: number;
  value: number;
  prediction?: number;
};
