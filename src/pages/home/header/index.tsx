import { useState } from "react";
import { AuthModal } from "../authModal";
import styles from "./index.less";
import { Button } from "antd";

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const ExitDuty = () => {
    setModalOpen(true);
  };
  return (
    <div className={styles["header"]}>
      <div className={styles["select"]}>
        <span className={styles["select-span"]} style={{ color: "#d3d3d3" }}>
          Manager:
        </span>
        <span className={styles["select-span"]} style={{ color: "#ffffff" }}>
          olfmanshin
        </span>
        <span className={styles["select-span"]} style={{ color: "#d3d3d3" }}>
          Guard:
        </span>
        <span className={styles["select-span"]} style={{ color: "#ffffff" }}>
          jack minsklu
        </span>
        <Button style={{ marginLeft: 20 }} onClick={ExitDuty}>
          EXIT DUTY
        </Button>
      </div>
      <AuthModal
        isModalOpen={isModalOpen}
        setModal={(val: boolean) => setModalOpen(val)}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};
