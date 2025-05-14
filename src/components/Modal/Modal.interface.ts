/*
--------------ModalProps Interface--------------
onClose - handler for close event
*/

import { HTMLAttributes } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}
