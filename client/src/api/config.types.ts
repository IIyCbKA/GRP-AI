/*
--------------PathsDefinitions type--------------
ENDPOINTS:
  ROOT_INFO   - for get-request that returns all existing regions and list of all existing parameters

PATHS:
  REGION      - for get-request that returns a data of existing region
  PREDICTION  - for get-request that returns a predictions of parameters
*/

export interface PathsDefinitions {
  ROOT_INFO: string;

  REGION: (regionID: string) => string;
  PREDICTION: (
    regionID: string,
    startingYear: number,
    period: number,
  ) => string;
}
