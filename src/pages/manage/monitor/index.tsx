import WithAuth from "@/wrappers/authAdmin";
import styles from "./index.less";
import RtspVideo from "@/components/map/videoModal/video";
import { Button, Form, Select, message } from "antd";
import { useEffect, useState } from "react";
import { getCamera } from "@/services/admin";
import { getMatrix, setMatrix } from "@/services/common";
import { MonitorSetting } from "@/type";
import { matrixData } from "@/utills";
const Monitor = () => {
  const [cameraOptions, setCameraOp] = useState<any[]>([]);
  const [currentCameras, setCurrentCameras] = useState<{
    [key: string]: any;
  }>();
  const [form] = Form.useForm();
  const fetchMartix = async () => {
    const { data: matrix } = await getMatrix();
    const camerasSetting: any = {};

    matrix.forEach((item: MonitorSetting) => {
      camerasSetting[`${item.row - 1}-${item.column - 1}`] = item.cameraId;
    });
    setCurrentCameras(camerasSetting);
    form.setFieldsValue(camerasSetting);
  };
  const fetchOptions = async () => {
    const { data: allCamera } = await getCamera("", false);
    console.log(allCamera);

    const options = allCamera.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setCameraOp([{ value: "", label: "none" }, ...options]);
  };
  const onFinsh = async (value: any) => {
    console.log(value, matrixData(value));
    await setMatrix(matrixData(value));
    message.success("Success");
    fetchMartix();
  };
  useEffect(() => {
    fetchOptions();
    fetchMartix();
  }, []);
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Monitor Setting
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
              <RtspVideo prefix="manage3" id={currentCameras["1-1"]} />
            )}
            {currentCameras && (
              <RtspVideo prefix="manage4" id={currentCameras["1-2"]} />
            )}
          </div>
        </div>
        <div className={styles["right-form"]}>
          <p className={styles["title"]}>Set up monitoring matrix</p>
          <div className={styles["form-container"]}>
            <Form
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              onFinish={onFinsh}
            >
              <Form.Item label="Left Top" name={"0-0"}>
                <Select
                  size={"middle"}
                  placeholder="Please select"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label="Right Top" name={"0-1"}>
                <Select
                  size={"middle"}
                  placeholder="Please select"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label="Left Bottom" name={"1-0"}>
                <Select
                  size={"middle"}
                  placeholder="Please select"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label="Right Bottom" name={"1-1"}>
                <Select
                  size={"middle"}
                  placeholder="Please select"
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Monitor);
