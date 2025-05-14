import React from "react";
import styles from "./newRegionForm.module.css";
import Modal from "@/components/Modal/Modal";
import { NewRegionFormProps } from "./NewRegionForm.interface";

export default function NewRegionForm({
  onClose,
}: NewRegionFormProps): React.ReactElement {
  return <Modal onClose={onClose}>text</Modal>;
}
