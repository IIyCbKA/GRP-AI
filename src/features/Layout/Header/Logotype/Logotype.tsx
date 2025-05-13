import React from "react";
import { Link } from "react-router-dom";
import Cash from "@/assets/icons/cash_180x180.svg?react";
import { PUBLIC_PATHS } from "@/routes/publicRoutes.constants";
import styles from "./logotype.module.css";

export default function Logotype(): React.ReactElement {
  return (
    <Link to={PUBLIC_PATHS.DEFAULT} className={styles.logotypeWrap}>
      <Cash className={styles.logotypeImg} />
    </Link>
  );
}
