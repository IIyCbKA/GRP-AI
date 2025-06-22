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
  DEFAULT_START_PRED_YEAR,
  GET_PREDICATION_TEXT,
  MODAL_TEXT,
  NON_SELECTED_TEXT,
  PRED_YEAR_LIMIT_TEXT,
  VALID_YEARS_LIST,
} from "./regionInfo.constants";
import Chart from "./Chart/Chart";
import { getSortedData } from "./regionInfo.utils";
import { ChartData, Parameter, ParameterID } from "../regions.types";
import classNames from "classnames";
import Button from "@/components/Buttons/Button/Button";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";

function Content(): React.ReactElement {
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const selectedRegionData = useAppSelector(selectSelectedRegionData);
  const parameters = useAppSelector(selectParametersMap);
  const dispatch = useAppDispatch();
  const [buttonLock, setButtonLock] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ChartData>({});
  const [isModalShow, setModalShow] = React.useState<boolean>(false);
  const [startYearPred, setStartYearPred] = React.useState<number>(
    DEFAULT_START_PRED_YEAR,
  );

  React.useEffect((): void => {
    if (selectedRegionData?.data) setData(getSortedData(selectedRegionData));
  }, [selectedRegionData]);

  const onPredictionClick: () => void = (): void => {
    if (selectedRegion) {
      setButtonLock(true);
      dispatch(
        getRegionPrediction({
          regionID: selectedRegion,
          startingYear: startYearPred,
        }),
      ).finally((): void => setButtonLock(false));
    }
    onCloseModal();
  };

  const onCloseModal: () => void = (): void => {
    setModalShow(false);
  };

  const onShowModal: () => void = (): void => {
    setModalShow(true);
  };

  const onChangeYear: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setStartYearPred(Number(e.currentTarget.value));
  };

  const onBlurYearCheck: () => void = (): void => {
    if (!VALID_YEARS_LIST.includes(startYearPred))
      setStartYearPred(DEFAULT_START_PRED_YEAR);
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
        <Button variant="contained" onClick={onShowModal} disabled={buttonLock}>
          {GET_PREDICATION_TEXT}
        </Button>
      </div>
      <Modal isOpen={isModalShow} onClose={onCloseModal}>
        <div className={styles.modalContentWrap}>
          <div className={styles.modalTitleWrap}>
            <span className={styles.modalTitleText}>{MODAL_TEXT}</span>
            <span className={sharedStyles.lowerText}>
              {PRED_YEAR_LIMIT_TEXT}
            </span>
          </div>

          <Input
            type="number"
            value={startYearPred}
            onChange={onChangeYear}
            onBlur={onBlurYearCheck}
          />
          <Button
            variant="contained"
            onClick={onPredictionClick}
            disabled={buttonLock}
          >
            {GET_PREDICATION_TEXT}
          </Button>
        </div>
      </Modal>
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
