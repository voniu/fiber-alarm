import { Input, Modal, message } from "antd";
import Verify from "@/assets/verify.svg";
import { useState } from "react";
import { useModel, history } from "umi";
import styles from "./index.less";

export const AuthModal = (props: {
  isModalOpen: boolean;
  setModal: (val: boolean) => void;
  onCancel: () => void;
}) => {
  const { isModalOpen, onCancel, setModal } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { monitor, unsetGuards } = useModel("useUserInfo");
  const onOk = async () => {
    setConfirmLoading(true);
    const { success, msg } = await unsetGuards(password);
    setConfirmLoading(false);
    if (!success) {
      message.error(msg);
      return;
    }
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
      okText="bəli"
      cancelText="xeyr"
      onCancel={() => {
        onCancel();
        setPassword("");
      }}
      confirmLoading={confirmLoading}
      width={400}
      onOk={onOk}
    >
      <div className={styles["container"]}>
        <img className={styles["verify-img"]} src={Verify} />
        <div className={styles["verify-con"]}>
          <div className={styles["verify-form"]}>
            <span className={styles["label"]}>menecer:</span>
            <span className={styles["content"]}>{monitor?.name}</span>
          </div>
          <div className={styles["verify-form"]}>
            <span className={styles["label"]}>Şifrə:</span>
            <Input.Password
              style={{
                width: 150,
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="giriş Şifrə"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
