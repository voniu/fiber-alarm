import WithAuth from "@/wrappers/auth";
import styles from "./index.less";
import video1 from "@/assets/video/1.png";
import video2 from "@/assets/video/2.png";
import video3 from "@/assets/video/3.png";
import video4 from "@/assets/video/4.png";
import { Button, Form, Select } from "antd";
const MonitorSetting = () => {
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
              labelAlign={"left"}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
            >
              <Form.Item label="Left Top">
                <Select>
                  <Select.Option value="camera1">camera1</Select.Option>
                  <Select.Option value="camera2">camera2</Select.Option>
                  <Select.Option value="camera3">camera3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Right Top">
                <Select>
                  <Select.Option value="camera1">camera1</Select.Option>
                  <Select.Option value="camera2">camera2</Select.Option>
                  <Select.Option value="camera3">camera3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Left Bottom">
                <Select>
                  <Select.Option value="camera1">camera1</Select.Option>
                  <Select.Option value="camera2">camera2</Select.Option>
                  <Select.Option value="camera3">camera3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Right Bottom">
                <Select>
                  <Select.Option value="camera1">camera1</Select.Option>
                  <Select.Option value="camera2">camera2</Select.Option>
                  <Select.Option value="camera3">camera3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button>Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(MonitorSetting);
