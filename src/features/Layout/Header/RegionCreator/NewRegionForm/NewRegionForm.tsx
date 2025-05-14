import React from "react";
import styles from "./newRegionForm.module.css";
import Modal from "@/components/Modal/Modal";
import { NewRegionFormProps } from "./NewRegionForm.interface";

export default function NewRegionForm({
  onClose,
}: NewRegionFormProps): React.ReactElement {
  const onSubmit: () => void = (): void => {};

  return (
    <Modal onClose={onClose}>
      <form onSubmit={onSubmit} className={styles.formWrap}></form>
    </Modal>
  );
}
