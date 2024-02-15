import EditMap from "@/components/editMap";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import styles from "./index.less";
import { setUiConfig } from "@/services/common";
interface IProps {
  open: boolean;
  onClose: () => void;
}
const MapCenter = (props: IProps) => {
  const { map, setMapCenterZoom, mapui, setMapUi } = useModel("useMap");

  const { open, onClose } = props;
  const [draw, setDraw] = useState<any>();
  const [layer, setLayer] = useState<any>();

  const [loading, setLoading] = useState(false);
  const zoomOption = (n: number) => {
    return new Array(n)
      .fill(0)
      .map((_, key) => ({ label: String(key), value: key }));
  };
  const afterClose = () => {
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
    onClose();
  };
  const [form] = Form.useForm();
  const getFormValue = () => {
    console.log("form");

    console.log(mapui.center);

    const center = mapui.center || "[40.60328820848655, 49.67083191777059]";
    console.log(center);

    const zoom = mapui.zoom || 14;
    form.setFieldValue("zoom", zoom);
    form.setFieldValue("location", center);
  };
  const onFinish = async (val: any) => {
    console.log(val);
    const { location, zoom } = val;
    console.log(location);

    setLoading(true);
    if (location) {
      setMapCenterZoom(JSON.parse(location), zoom);
      setMapUi({ zoom, center: location });
      await setUiConfig({ mapCenter: location, mapScale: zoom });
    }
    setLoading(false);
    afterClose();
  };
  const setLocation = (location: any) => {
    form.setFieldValue("location", location);
  };
  const zoomChange = (val: any) => {
    map.getView().setZoom(val);
  };
  useEffect(() => {
    if (!open) return;
    console.log("CENTER");
    getFormValue();
    return () => {
      console.log("REMOVE");
    };
  }, [open]);
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
                <Select onChange={zoomChange} options={zoomOption(18)}></Select>
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
                <Button type="primary" htmlType="submit" loading={loading}>
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
