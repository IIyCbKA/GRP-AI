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
      prediction: region.prediction?.[item.parameterID]?.[item.year],
    };
    if (!data[item.parameterID]) data[item.parameterID] = [];

    data[item.parameterID].push(itemForData);
  });

  Object.keys(data).forEach((key: string): void => {
    data[key].sort((a, b): number => a.year - b.year);
  });

  return data;
};
