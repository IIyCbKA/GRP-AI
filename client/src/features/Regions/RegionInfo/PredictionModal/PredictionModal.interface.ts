/*
--------------PredictionalModalProps Interface--------------
isShow                     - modal is show flag
predictionButtonsLock      - button is lock flag

onClose                    - func for close modal
onPredictionButtonsLock    - func for lock all prediction buttons
onPredictionButtonsUnlock  - func for unlock all prediction buttons
*/

export interface PredictionalModalProps {
  isShow: boolean;
  isPredictionButtonsLock: boolean;

  onClose: () => void;
  onPredictionButtonsLock: () => void;
  onPredictionButtonsUnlock: () => void;
}
