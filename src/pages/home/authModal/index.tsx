import { Input, Modal } from "antd";
import Verify from "@/assets/verify.svg";
import { useState } from "react";
import { useModel, history } from "umi";
import styles from "./index.less";
import { offDuty } from "@/services/monitor";
export const AuthModal = (props: {
  isModalOpen: boolean;
  setModal: (val: boolean) => void;
  onCancel: () => void;
}) => {
  const { isModalOpen, onCancel, setModal } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { monitor } = useModel("useUserInfo");
  const onOk = async () => {
    setConfirmLoading(true);
    await offDuty(monitor!.name, password);
    setConfirmLoading(false);
    setModal(false);
    history.push("/home/duty");
  };
  return (
    <Modal
      style={{ top: 120 }}
      title={null}
      keyboard={false}
      maskClosable={false}
      open={isModalOpen}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      width={400}
      onOk={onOk}
    >
      <div className={styles["container"]}>
        <img className={styles["verify-img"]} src={Verify} />
        <div style={{ width: 300 }}>
          <div className={styles["verify-form"]}>
            <span style={{ marginBottom: 20 }}>current manager:</span>
            <span>{monitor!.name}</span>
          </div>
          <div className={styles["verify-form"]}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              password:
            </span>
            <Input.Password
              style={{
                width: 150,
              }}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="input password"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
