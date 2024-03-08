import { useEffect } from "react";
import RtspVideo from "./video";
import { Modal } from "antd";
import { useIntl } from "umi";
interface IProps {
  id?: number;
  open: boolean;
  onCancel: () => void;
}
export default (props: IProps) => {
  const { id, open, onCancel } = props;
  const intl = useIntl();
  const camera = intl.formatMessage({ id: "camera" });
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        style={{ top: 120 }}
        title={`Monitor(${camera}:${id})`}
        footer={null}
        open={open}
        onCancel={onCancel}
        width={600}
        destroyOnClose
      >
        <div>
          <RtspVideo
            prefix={"modal"}
            id={id}
            style={{ height: 350, width: 550 }}
          />
        </div>
      </Modal>
    </>
  );
};
