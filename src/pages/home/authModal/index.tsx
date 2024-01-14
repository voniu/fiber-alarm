import { Input, Modal } from "antd";
import Verify from "@/assets/verify.svg";
import { useState } from "react";
import { useModel } from "umi";
import styles from "./index.less";
import { offDuty, onDuty } from "@/services/monitor";
export const AuthModal = (props: {
  isModalOpen: boolean;
  setModal: (val: boolean) => void;
  onCancel: () => void;
  selectVal: string | null;
  newVal: string | null;
  setSelect: (val: string) => void;
}) => {
  const { isModalOpen, onCancel, setModal, setSelect, newVal } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { currentUser } = useModel("useUserInfo");
  const onOk = async () => {
    setSelect(newVal as string);
    setConfirmLoading(true);
    await offDuty(currentUser.name, password);
    await onDuty(Number(newVal));
    setConfirmLoading(false);

    setModal(false);
  };
  return (
    <Modal
      style={{ top: 20 }}
      title={null}
      keyboard={false}
      maskClosable={false}
      open={isModalOpen}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      width={500}
      onOk={onOk}
    >
      <div className={styles["container"]}>
        <img className={styles["verify-img"]} src={Verify} />
        <div style={{ width: 300 }}>
          <div className={styles["verify-form"]}>
            <span style={{ marginBottom: 20 }}>current manager:</span>
            <span>{currentUser.name}</span>
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
