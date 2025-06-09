/*
--------------PathsDefinitions type--------------
ENDPOINTS:
  REGIONS  - for get-request that returns a list of all existing regions

PATHS:
  REGION   - for get-request that returns a data of existing region
*/

export interface PathsDefinitions {
  REGIONS: string;

  REGION: (regionID: string) => string;
}
