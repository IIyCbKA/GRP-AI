import { PathsDefinitions } from "./config.types";

export const PATHS: PathsDefinitions = {
  ROOT_INFO: "/grp/root/",

  REGION: (regionID: string): string => `/grp/region/${regionID}/`,
  PREDICTION: (
    regionID: string,
    startingYear: number,
    period: number,
  ): string => `/grp/predictions/${regionID}/${startingYear}/${period}/`,
};
