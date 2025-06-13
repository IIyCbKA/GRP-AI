import React from "react";
import styles from "./avatar.module.css";
import { AvatarProps } from "./Avatar.interface";
import classNames from "classnames";

function InnerAvatar(
  { className, ...other }: AvatarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
  const avatarStyles = classNames(styles.avatarRoot, className);

  return <div ref={ref} className={avatarStyles} {...other} />;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(InnerAvatar);

export default Avatar;
