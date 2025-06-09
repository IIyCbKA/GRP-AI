import { PathsDefinitions } from "./config.types";

export const PATHS: PathsDefinitions = {
  REGIONS: "/regions/",

  REGION: (regionID: string): string => `/region/${regionID}/`,
};
