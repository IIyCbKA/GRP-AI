import React from "react";
import styles from "./regionInfo.module.css";
import { useAppSelector } from "@/store/hooks";
import {
  selectParametersMap,
  selectSelectedRegion,
  selectSelectedRegionData,
} from "../regions.slice";
import { NON_SELECTED_TEXT } from "./regionInfo.constants";
import Chart from "./Chart/Chart";
import { getSortedData } from "./regionInfo.utils";
import { EntityChartData, ChartData } from "../regions.types";

function Content(): React.ReactElement {
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const selectedRegionData = useAppSelector(selectSelectedRegionData);
  const parameters = useAppSelector(selectParametersMap);
  const [data, setData] = React.useState<ChartData>({});

  React.useEffect((): void => {
    if (selectedRegionData?.data) setData(getSortedData(selectedRegionData));
  }, [selectedRegionData, parameters]);

  if (selectedRegion === null)
    return <div className={styles.nonselectedContent}>{NON_SELECTED_TEXT}</div>;

  return (
    <>
      {Object.entries(data).map(
        ([parameterID, parameterData]: [
          string,
          EntityChartData[],
        ]): React.ReactElement => (
          <Chart
            key={parameterID}
            title={parameters[parameterID].name}
            data={parameterData}
          />
        ),
      )}
    </>
  );
}

export default function RegionInfo(): React.ReactElement {
  return (
    <div className={styles.infoWrap}>
      <div className={styles.infoContent}>
        <Content />
      </div>
    </div>
  );
}
