import { useState } from "react";
import { AuthModal } from "../authModal";
import styles from "./index.less";
import { Button } from "antd";
import Logo from "@/assets/logo_new.png";
import { useModel, FormattedMessage } from "umi";

export default () => {
  const { guard, monitor } = useModel("useUserInfo");
  const [isModalOpen, setModalOpen] = useState(false);
  const ExitDuty = () => {
    setModalOpen(true);
  };
  return (
    <div className={styles["header"]}>
      <div className={styles["logo-img"]}>
        <img src={Logo} />
      </div>
      <div className={styles["header-title"]}>
        <span>
          <FormattedMessage id="Integrated Security Operation Platform" />
        </span>
      </div>
      <div className={styles["select"]}>
        <span className={styles["select-span"]} style={{ color: "#d3d3d3" }}>
          <FormattedMessage id="Officer" />:
        </span>
        <span className={styles["select-span"]} style={{ color: "#ffffff" }}>
          {monitor?.name}
        </span>
        <span className={styles["select-span"]} style={{ color: "#d3d3d3" }}>
          <FormattedMessage id="Guarder" />:
        </span>
        <span className={styles["select-span"]} style={{ color: "#ffffff" }}>
          {guard?.name}
        </span>
        <Button style={{ marginLeft: 20 }} onClick={ExitDuty}>
          <FormattedMessage id="EXIT DUTY" />
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
