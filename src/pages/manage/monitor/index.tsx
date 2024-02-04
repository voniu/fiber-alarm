import WithAuth from "@/wrappers/authAdmin";
import styles from "./index.less";
import video1 from "@/assets/video/1.png";
import video2 from "@/assets/video/2.png";
import video3 from "@/assets/video/3.png";
import video4 from "@/assets/video/4.png";
import { Button, Form, Select, message } from "antd";
import { useEffect, useState } from "react";
import { getCamera } from "@/services/admin";
import { getMatrix, setMatrix } from "@/services/common";
import { MonitorSetting } from "@/type";
import { matrixData } from "@/utills";
const Monitor = () => {
  const [cameraOptions, setCameraOp] = useState([]);
  const [form] = Form.useForm();
  const fetchOptions = async () => {
    const { data: allCamera } = await getCamera("");
    console.log(allCamera);

    const options = allCamera.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    const { data: matrix } = await getMatrix();
    const camerasSetting: any = {};

    matrix.forEach((item: MonitorSetting) => {
      camerasSetting[`${item.row - 1}-${item.column - 1}`] = item.cameraId;
    });
    setCameraOp(options);
    form.setFieldsValue(camerasSetting);
  };
  const onFinsh = (value: any) => {
    console.log(value, matrixData(value));
    setMatrix(matrixData(value));
    message.success("Success");
  };
  useEffect(() => {
    fetchOptions();
  }, []);
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Monitor Setting
      </p>
      <div className={styles["main"]}>
        <div>
          <div style={{ display: "flex", marginTop: 2, marginLeft: 4 }}>
            <img className={styles["video"]} src={video1}></img>
            <img className={styles["video"]} src={video2}></img>
          </div>
          <div style={{ display: "flex", marginTop: 2, marginLeft: 4 }}>
            <img className={styles["video"]} src={video3}></img>
            <img className={styles["video"]} src={video4}></img>
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
