import { useEffect } from "react";
import { Modal } from "antd";
import Map from "./map";
import { FormattedMessage } from "umi";
interface IProps {
  id: number;
  type: string;
  isModalOpen: boolean;
  onClose: () => void;
}
export default (props: IProps) => {
  const { isModalOpen, onClose, id, type } = props;
  useEffect(() => {}, []);
  return (
    <Modal
      style={{ top: 20 }}
      destroyOnClose
      title={null}
      footer={null}
      open={isModalOpen}
      width={700}
      onCancel={onClose}
      afterClose={onClose}
    >
      <p style={{ fontWeight: "bold" }}>
        <FormattedMessage id={"Location"} />
      </p>
      <Map id={id} type={type} />
    </Modal>
  );
};
