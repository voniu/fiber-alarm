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
import { useModel } from "umi";
const Monitor = () => {
  const [cameraOptions, setCameraOp] = useState<any[]>([]);
  const [currentCameras, setCurrentCameras] = useState<{
    [key: string]: any;
  }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    None,
    Success,
    MonitoringMatrix,
    SetUpMonitoringMatrix,
    Submit,
    PleaseSelect,
  } = useModel("useLocaleText");
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
    setCameraOp([{ value: "", label: None }, ...options]);
  };
  const onFinsh = async (value: any) => {
    setLoading(true);
    console.log(value, matrixData(value));
    const { success, msg } = await setMatrix(matrixData(value));
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
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
        {MonitoringMatrix}
      </p>
      <div className={styles["main"]}>
        <div style={{ flexShrink: 0, width: 400 }}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {currentCameras && (
              <RtspVideo prefix="manage1" id={currentCameras["0-0"]} />
            )}
            {currentCameras && (
              <RtspVideo prefix="manage2" id={currentCameras["0-1"]} />
            )}
            {currentCameras && (
              <RtspVideo prefix="manage3" id={currentCameras["1-0"]} />
            )}
            {currentCameras && (
              <RtspVideo prefix="manage4" id={currentCameras["1-1"]} />
            )}
          </div>
        </div>
        <div className={styles["right-form"]}>
          <p className={styles["title"]}>{SetUpMonitoringMatrix}</p>
          <div className={styles["form-container"]}>
            <Form
              style={{ width: 300 }}
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              onFinish={onFinsh}
            >
              <Form.Item label={"First"} name={"0-0"}>
                <Select
                  size={"middle"}
                  placeholder={PleaseSelect}
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label={"Second"} name={"0-1"}>
                <Select
                  size={"middle"}
                  placeholder={PleaseSelect}
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label={"Third"} name={"1-0"}>
                <Select
                  size={"middle"}
                  placeholder={PleaseSelect}
                  style={{ width: "150px" }}
                  options={cameraOptions}
                />
              </Form.Item>
              <Form.Item label={"Fourth"} name={"1-1"}>
                <Select
                  size={"middle"}
                  placeholder={PleaseSelect}
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
                  {Submit}
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
