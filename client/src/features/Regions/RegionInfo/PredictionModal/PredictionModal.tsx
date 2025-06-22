import React from "react";
import styles from "./predictionModal.module.css";
import {
  MODAL_BUTTON_TEXT,
  MODAL_TITLE_TEXT,
  PRED_YEAR_LIMIT_TEXT,
  DEFAULT_START_YEAR,
  VALID_YEARS_LIST,
  DEFAULT_END_YEAR,
  START_YEAR_POSTSCRIPT,
  END_YEAR_POSTSCRIPT,
} from "./predictionModal.constants";
import sharedStyles from "@/shared/shared.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button/Button";
import Modal from "@/components/Modal/Modal";
import {
  getRegionPrediction,
  selectSelectedRegion,
} from "@/features/Regions/regions.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PredictionalModalProps } from "./PredictionModal.interface";

export default function PredictionModal({
  isShow,
  isPredictionButtonsLock,
  onClose,
  onPredictionButtonsLock,
  onPredictionButtonsUnlock,
}: PredictionalModalProps): React.ReactElement {
  const selectedRegion = useAppSelector(selectSelectedRegion);
  const dispatch = useAppDispatch();
  const [startYear, setStartYear] = React.useState<number>(DEFAULT_START_YEAR);
  const [endYear, setEndYear] = React.useState<number>(DEFAULT_END_YEAR);

  const onChangeStartYear: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setStartYear(Number(e.currentTarget.value));
  };

  const onChangeEndYear: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEndYear(Number(e.currentTarget.value));
  };

  const onBlurStartYear: () => void = (): void => {
    if (!VALID_YEARS_LIST.includes(startYear)) setStartYear(DEFAULT_START_YEAR);
  };

  const onBlurEndYear: () => void = (): void => {
    if (!VALID_YEARS_LIST.includes(endYear) || startYear > endYear)
      setEndYear(DEFAULT_END_YEAR);
  };

  const onPredictionClick: () => void = (): void => {
    if (selectedRegion) {
      onPredictionButtonsLock();
      const period = endYear - startYear + 1;
      dispatch(
        getRegionPrediction({
          regionID: selectedRegion,
          startingYear: startYear,
          period: period,
        }),
      ).finally((): void => onPredictionButtonsUnlock());
    }
    onClose();
  };

  return (
    <Modal isOpen={isShow} onClose={onClose}>
      <div className={styles.contentWrap}>
        <div className={styles.titleWrap}>
          <span className={sharedStyles.boldText}>{MODAL_TITLE_TEXT}</span>
          <span className={sharedStyles.lowerText}>{PRED_YEAR_LIMIT_TEXT}</span>
        </div>
        <div className={styles.yearsBlock}>
          {START_YEAR_POSTSCRIPT}
          <Input
            type="number"
            value={startYear}
            onChange={onChangeStartYear}
            onBlur={onBlurStartYear}
          />
          {END_YEAR_POSTSCRIPT}
          <Input
            type="number"
            value={endYear}
            onChange={onChangeEndYear}
            onBlur={onBlurEndYear}
          />
        </div>
        <Button
          variant="contained"
          onClick={onPredictionClick}
          disabled={isPredictionButtonsLock}
        >
          {MODAL_BUTTON_TEXT}
        </Button>
      </div>
    </Modal>
  );
}
