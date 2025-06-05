import React from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "@/components/Modal/Modal.interface";
import classNames from "classnames";
import styles from "./modal.module.css";
import { CSSTransition } from "react-transition-group";

function ModalInner(
  {
    animationDuration = 250,
    children,
    className,
    isOpen,
    onClose,
    ...other
  }: ModalProps,
  ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(
    ref,
    (): HTMLDivElement => innerRef.current as HTMLDivElement,
  );

  const styleAnimation = {
    "--modal-duration": `${animationDuration}ms`,
  } as React.CSSProperties;

  const modalStyles = classNames(styles.modalWrap, className);

  const onModalContentClick: (e: React.MouseEvent) => void = (
    e: React.MouseEvent,
  ): void => {
    e.stopPropagation();
  };

  return createPortal(
    <CSSTransition
      nodeRef={innerRef}
      in={isOpen}
      timeout={animationDuration}
      classNames={{
        enterActive: styles.enterActive,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
    >
      <div
        ref={innerRef}
        style={styleAnimation}
        className={modalStyles}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        {...other}
      >
        <div onClick={onModalContentClick}>{children}</div>
      </div>
    </CSSTransition>,
    document.body,
  );
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(ModalInner);

export default Modal;
