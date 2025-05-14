import React from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "@/components/Modal/Modal.interface";
import classNames from "classnames";

export default function Modal({
  children,
  className,
  onClose,
  ...other
}: ModalProps): React.ReactElement {
  const modalStyles = classNames(className);

  const onModalContentClick: (e: React.MouseEvent) => void = (
    e: React.MouseEvent,
  ): void => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className={modalStyles}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      {...other}
    >
      <div onClick={onModalContentClick}>{children}</div>
    </div>,
    document.body,
  );
}
