import React from "react";
import { IconButtonProps } from "./IconButton.interface";
import styles from "./iconButton.module.css";
import classNames from "classnames";

export default function IconButton({
  className,
  type = "button",
  ...other
}: IconButtonProps): React.ReactElement {
  const buttonStyles = classNames(styles.iconButtonRoot, className);

  return <button {...other} type={type} className={buttonStyles} />;
}
