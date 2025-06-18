import {
  RecordsForChart,
  EntityForChart,
  Region,
  RegionDataEntity,
} from "../regions.types";

export const getSortedData: (region: Region) => RecordsForChart = (
  region: Region,
): RecordsForChart => {
  const data: RecordsForChart = {};
  region.data.forEach((item: RegionDataEntity): void => {
    const itemForData: EntityForChart = {
      year: item.year,
      value: item.value,
    };
    if (!data[item.parameter_id]) data[item.parameter_id] = [];

    data[item.parameter_id].push(itemForData);
  });

  return data;
};
