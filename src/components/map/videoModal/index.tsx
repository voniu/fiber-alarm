import { useEffect } from "react";
import RtspVideo from "./video";
import { Modal } from "antd";
interface IProps {
  id?: number;
  open: boolean;
  onCancel: () => void;
}
export default (props: IProps) => {
  const { id, open, onCancel } = props;
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        style={{ top: 120 }}
        title={`Monitor(cameraId:${id})`}
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
