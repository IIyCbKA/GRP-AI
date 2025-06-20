import { PathsDefinitions } from "./config.types";

export const PATHS: PathsDefinitions = {
  ROOT_INFO: "/grp/root/",

  REGION: (regionID: string): string => `/grp/region/${regionID}/`,
  PREDICTION: (regionID: string): string =>
    `/grp/predictions/${regionID}/2012/5/`,
};
