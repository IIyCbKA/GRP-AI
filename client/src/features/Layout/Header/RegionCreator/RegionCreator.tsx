import React from "react";
import styles from "./regionCreator.module.css";
import Plus from "@/assets/icons/plus_64x64.svg?react";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import NewRegionForm from "./NewRegionForm/NewRegionForm";

export default function RegionCreator(): React.ReactElement {
  const [isShowForm, setShowForm] = React.useState(false);

  const onClick: () => void = (): void => {
    setShowForm(true);
  };

  const onClose: () => void = (): void => {
    setShowForm(false);
  };

  return (
    <>
      <IconButton onClick={onClick} className={styles.creatorWrap}>
        <Plus />
      </IconButton>
      {isShowForm && <NewRegionForm onClose={onClose} />}
    </>
  );
}
