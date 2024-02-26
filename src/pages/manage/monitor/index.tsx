import WithAuth from "@/wrappers/authAdmin";
import styles from "./index.less";
import RtspVideo from "@/components/map/videoModal/video";
import { Button, Form, Select, message } from "antd";
import { useEffect, useState } from "react";
import { getCamera } from "@/services/admin";
import { getMatrix, setMatrix } from "@/services/common";
import { MonitorSetting } from "@/type";
import { matrixData } from "@/utills";
import TestVideo from "./testVideo";
const Monitor = () => {
  const [cameraOptions, setCameraOp] = useState<any[]>([]);
  const [currentCameras, setCurrentCameras] = useState<{
    [key: string]: any;
  }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fetchMartix = async () => {
    const { success, msg, data: matrix } = await getMatrix();
    const camerasSetting: any = {};
    if (!success) {
      message.error(msg);
      return;
    }
    matrix.forEach((item: MonitorSetting) => {
      camerasSetting[`${item.row - 1}-${item.column - 1}`] = item.cameraId;
    });
    setCurrentCameras(camerasSetting);
    form.setFieldsValue(camerasSetting);
  };
  const fetchOptions = async () => {
    const { success, msg, data: allCamera } = await getCamera("", false);
    console.log(allCamera);
    if (!success) {
      message.error(msg);
      return;
    }
    const options = allCamera.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setCameraOp([{ value: "", label: "none" }, ...options]);
  };
  const onFinsh = async (value: any) => {
    setLoading(true);
    console.log(value, matrixData(value));
    const { success, msg } = await setMatrix(matrixData(value));
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
    }
    setLoading(false);
    setCurrentCameras(undefined);
    fetchMartix();
  };
  // const handleOpen = () => {
  //   setCurrentCameras(form.getFieldsValue());
  //   setOpen(true);
  // };
  useEffect(() => {
    fetchOptions();
    fetchMartix();
  }, []);
  return (
    <div style={{ minWidth: 1200 }}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Monitor Parametrləri
      </p>
      <div className={styles["main"]}>
        <div style={{ flexShrink: 0, width: 600 }}>
          <div style={{ display: "flex", marginTop: 2, marginLeft: 4 }}>
            {currentCameras && (
              <RtspVideo prefix="manage1" id={currentCameras["0-0"]} />
            )}
            {currentCameras && (
              <RtspVideo prefix="manage2" id={currentCameras["0-1"]} />
            )}
          </div>
          <div style={{ display: "flex", marginTop: 2, marginLeft: 4 }}>
            {currentCameras && (
              <RtspVideo prefix="manage3" id={currentCameras["1-0"]} />
            )}
            {currentCameras && (
              <RtspVideo prefix="manage4" id={currentCameras["1-1"]} />
            )}
          </div>
        </div>
        <div className={styles["right-form"]}>
          <p className={styles["title"]}>Monitorinq matriksini qur</p>
          <div className={styles["form-container"]}>
            <Form
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              onFinish={onFinsh}
            >
              <Form.Item label="sol yuxarı" name={"0-0"}>
                <Select
                  size={"middle"}
                  placeholder="seçin"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label="sağ yuxarı" name={"0-1"}>
                <Select
                  size={"middle"}
                  placeholder="seçin"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label="sol aşağı" name={"1-0"}>
                <Select
                  size={"middle"}
                  placeholder="seçin"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label="sağ aşağı" name={"1-1"}>
                <Select
                  size={"middle"}
                  placeholder="seçin"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                {/* <Button
                  style={{ marginRight: 10 }}
                  onClick={() => handleOpen()}
                >
                  Test
                </Button> */}
                <Button type="primary" htmlType="submit" loading={loading}>
                  təqdim
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <TestVideo
        cameras={currentCameras}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
};

export default WithAuth(Monitor);
