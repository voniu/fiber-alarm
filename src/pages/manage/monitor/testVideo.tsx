import { useEffect } from "react";
import RtspVideo from "@/components/map/videoModal/video";
import { Modal } from "antd";
import { useModel } from "umi";
interface IProps {
  cameras: any;
  open: boolean;
  onCancel: () => void;
}
export default (props: IProps) => {
  const { cameras, open, onCancel } = props;
  const { Monitor } = useModel("useLocaleText");
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        style={{ top: 100 }}
        title={Monitor}
        footer={null}
        open={open}
        onCancel={onCancel}
        width={650}
        destroyOnClose
      >
        <div
          style={{
            flexShrink: 0,
            width: 600,
            height: 350,
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          <div style={{ display: "flex", marginTop: 2, marginLeft: 4 }}>
            {cameras && <RtspVideo prefix="test-manage1" id={cameras["0-0"]} />}
            {cameras && <RtspVideo prefix="test-manage2" id={cameras["0-1"]} />}
          </div>
          <div style={{ display: "flex", marginTop: 2, marginLeft: 4 }}>
            {cameras && <RtspVideo prefix="test-manage3" id={cameras["1-0"]} />}
            {cameras && <RtspVideo prefix="test-manage4" id={cameras["1-1"]} />}
          </div>
        </div>
      </Modal>
    </>
  );
};
