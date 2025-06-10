import { PathsDefinitions } from "./config.types";

export const PATHS: PathsDefinitions = {
  REGIONS: "/grp/regions/",

  REGION: (regionID: string): string => `/grp/region/${regionID}/`,
};
