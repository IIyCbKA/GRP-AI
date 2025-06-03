import React from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "@/components/Modal/Modal.interface";
import classNames from "classnames";
import styles from "./modal.module.css";

function ModalInner(
  { children, className, onClose, ...other }: ModalProps,
  ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
  const modalStyles = classNames(styles.modalWrap, className);

  const onModalContentClick: (e: React.MouseEvent) => void = (
    e: React.MouseEvent,
  ): void => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      ref={ref}
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

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(ModalInner);

export default Modal;
