import EditMap from "@/components/editMap";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import styles from "./index.less";
interface IProps {
  open: boolean;
  onClose: () => void;
}
const MapCenter = (props: IProps) => {
  const { map, setMapCenterZoom } = useModel("useMap");

  const { open, onClose } = props;
  const [draw, setDraw] = useState<any>();
  const [layer, setLayer] = useState<any>();
  const zoomOption = (n: number) => {
   return new Array(n).fill(0).map((_, key) => ({ label: String(key), value: key }));
  };
  const afterClose = () => {
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
    onClose();
  };
  const [form] = Form.useForm();
  const onFinish = (val: any) => {
    console.log(val);
    const { location, zoom } = val;
    if (location) {
      const center = JSON.parse(location);
      setMapCenterZoom(center, zoom);
    }
    afterClose();
  };
  const setLocation = (location: any) => {
    form.setFieldValue("location", location);
  };
  useEffect(() => {
    console.log("CENTER");
    return () => {
      console.log("REMOVE");
    };
  }, []);
  return (
    <>
      <Modal
        style={{ top: 20 }}
        destroyOnClose
        title={null}
        footer={null}
        open={open}
        width={1100}
        onCancel={afterClose}
      >
        <p style={{ fontWeight: "bold" }}>{"Map Setting"}</p>

        <div className={styles["container"]}>
          <div style={{ width: 400 }}>
            <Form
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Zoom"
                name={"zoom"}
                rules={[
                  { required: true, message: "Please select zoom level!" },
                ]}
              >
                <Select
                  options={zoomOption(18)}
                ></Select>
              </Form.Item>

              <Form.Item
                label="Center"
                name={"location"}
                rules={[
                  { required: true, message: "Please input the location!" },
                ]}
              >
                <Input.TextArea
                  autoSize={{ maxRows: 4 }}
                  disabled
                  placeholder="auto select"
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <EditMap
            setLocation={(l: any) => setLocation(l)}
            type={"Point"}
            draw={draw}
            setDraw={setDraw}
            layer={layer}
            setLayer={setLayer}
            target="manage-zone-map"
          />
        </div>
      </Modal>
    </>
  );
};
export default MapCenter;
