import {
  ChartData,
  EntityChartData,
  Region,
  RegionDataEntity,
} from "../regions.types";

export const getSortedData: (region: Region) => ChartData = (
  region: Region,
): ChartData => {
  const data: ChartData = {};
  region.data.forEach((item: RegionDataEntity): void => {
    const itemForData: EntityChartData = {
      year: item.year,
      value: item.value,
    };
    if (!data[item.parameterID]) data[item.parameterID] = [];

    data[item.parameterID].push(itemForData);
  });

  return data;
};
