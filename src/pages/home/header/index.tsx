import { useState } from "react";
import { AuthModal } from "../authModal";
import styles from "./index.less";
import { Button } from "antd";
import { useModel, SelectLang, FormattedMessage } from "umi";

export default () => {
  const { guard, monitor } = useModel("useUserInfo");
  const [isModalOpen, setModalOpen] = useState(false);
  const ExitDuty = () => {
    setModalOpen(true);
  };
  return (
    <div className={styles["header"]}>
      <div className={styles["header-title"]}>
        <span><FormattedMessage id="Intelligent Security Alarm Platform" /></span>
      </div>
      <div className={styles["select"]}>
        <span className={styles["select-span"]} style={{ color: "#d3d3d3" }}>
          Manager:
        </span>
        <span className={styles["select-span"]} style={{ color: "#ffffff" }}>
          {monitor?.name}
        </span>
        <span className={styles["select-span"]} style={{ color: "#d3d3d3" }}>
          Guard:
        </span>
        <span className={styles["select-span"]} style={{ color: "#ffffff" }}>
          {guard?.name}
        </span>
        <SelectLang />
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
