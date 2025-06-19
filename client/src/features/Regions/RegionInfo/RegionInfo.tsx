import React from "react";
import styles from "./regionInfo.module.css";
import sharedStyles from "@/shared/shared.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getRegionPrediction,
  selectParametersMap,
  selectSelectedRegion,
  selectSelectedRegionData,
} from "../regions.slice";
import {
  GET_PREDICATION_TEXT,
  NON_SELECTED_TEXT,
} from "./regionInfo.constants";
import Chart from "./Chart/Chart";
import { getSortedData } from "./regionInfo.utils";
import { ChartData, Parameter, ParameterID } from "../regions.types";
import classNames from "classnames";
import Button from "@/components/Buttons/Button/Button";

function Content(): React.ReactElement {
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const selectedRegionData = useAppSelector(selectSelectedRegionData);
  const parameters = useAppSelector(selectParametersMap);
  const dispatch = useAppDispatch();
  const [buttonLock, setButtonLock] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ChartData>({});

  React.useEffect((): void => {
    if (selectedRegionData?.data) setData(getSortedData(selectedRegionData));
  }, [selectedRegionData]);

  const onPredictionClick: () => void = (): void => {
    if (selectedRegion) {
      setButtonLock(true);
      dispatch(getRegionPrediction(selectedRegion)).finally((): void =>
        setButtonLock(false),
      );
    }
  };

  if (selectedRegion === null)
    return <div className={styles.nonselectedContent}>{NON_SELECTED_TEXT}</div>;

  const titleStyles = classNames(styles.infoTitle, sharedStyles.upperText);

  return (
    <>
      <span className={titleStyles}>{selectedRegionData?.name}</span>
      {Object.entries(parameters).map(
        ([parameterID, parameter]: [
          ParameterID,
          Parameter,
        ]): React.ReactElement => (
          <Chart
            key={parameterID}
            title={parameter.name}
            data={data[parameterID]}
          />
        ),
      )}
      <div className={styles.predictionButtonWrap}>
        <Button
          variant="contained"
          onClick={onPredictionClick}
          disabled={buttonLock}
        >
          {GET_PREDICATION_TEXT}
        </Button>
      </div>
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
