import EditMap from "@/components/editMap";
import { Form, Modal, Input, Button } from "antd";
import styles from "./index.less";
import { useEffect } from "react";
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
  const [form] = Form.useForm();
  const setLocation = (location: any) => {
    form.setFieldValue("location", location);
  };
  useEffect(() => {
    console.log("form   sadas");

    form.setFieldValue(location, "");
  }, []);
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
      {addType === "camera" && <p style={{ fontWeight: "bold" }}>Add Camera</p>}
      {addType === "fiber" && <p style={{ fontWeight: "bold" }}>Add Fiber</p>}
      <div className={styles["container"]}>
        <div style={{ width: 400 }}>
          <Form
            form={form}
            labelAlign={"left"}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Id">
              <Input placeholder="input" />
            </Form.Item>
            <Form.Item label="Name">
              <Input placeholder="input" />
            </Form.Item>
            <Form.Item label="Location" name={"location"}>
              <Input.TextArea autoSize disabled placeholder="auto select" />
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
            setLocation={(l: any) => setLocation(l)}
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
