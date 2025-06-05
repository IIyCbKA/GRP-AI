/*
--------------ModalProps Interface--------------
isOpen             - modal is open flag
animationDuration  - duration of opening/closing animation in ms
onClose            - handler for close event
*/

import { HTMLAttributes } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  animationDuration?: number;

  onClose: () => void;
}
