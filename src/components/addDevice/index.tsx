import EditMap from "@/components/editMap";
import { Form, Modal, Input, Button } from "antd";
import styles from "./index.less";
interface IProps {
  isModalOpen: boolean;
  addType: string;
  onClose: () => void;
  draw: any;
  setDraw: (val: any) => void;
  layer: any;
  setLayer: (val: any) => void;
}
export default (props: IProps) => {
  const { isModalOpen, addType, onClose, draw, setDraw, layer, setLayer } =
    props;
  return (
    <Modal
      style={{ top: 20 }}
      destroyOnClose
      title={null}
      footer={null}
      keyboard={false}
      maskClosable={false}
      open={isModalOpen}
      width={1100}
      onCancel={onClose}
      afterClose={onClose}
    >
      <p style={{ fontWeight: "bold" }}>Add Camera</p>
      <div className={styles["container"]}>
        <div style={{ width: 400 }}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Camera Id">
              <Input placeholder="input" />
            </Form.Item>
            <Form.Item label="Camera Name">
              <Input placeholder="input" />
            </Form.Item>
            <Form.Item label="Location">
              <Input placeholder="auto select" />
            </Form.Item>
            <Form.Item label="Other Info">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 16 }}>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <EditMap
            type={addType === "fiber" ? "LineString" : "Point"}
            draw={draw}
            setDraw={setDraw}
            layer={layer}
            setLayer={setLayer}
          />
        </div>
      </div>
    </Modal>
  );
};
