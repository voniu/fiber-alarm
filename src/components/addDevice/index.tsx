import EditMap from "@/components/editMap";
import { Form, Modal, Input, Button, Select } from "antd";
import styles from "./index.less";
import { useEffect, useState } from "react";
import {
  addCamera,
  addFiber,
  getCameraDetail,
  getFiberDetail,
  setFiberDetail,
  updateCamera,
} from "@/services/admin";
import { ArrayItemToFixed, generateLines } from "@/utills";
interface IProps {
  operator: string;
  isModalOpen: boolean;
  type: string;
  deviceId?: number;
  onClose: () => void;
  draw: any;
  setDraw: (val: any) => void;
  layer: any;
  setLayer: (val: any) => void;
}
export default (props: IProps) => {
  const {
    operator,
    deviceId,
    isModalOpen,
    type,
    onClose,
    draw,
    setDraw,
    layer,
    setLayer,
  } = props;
  const titleMap: any = {
    "add-camera": "Add Camera",
    "add-fiber": "Add fiber",
    "add-fiber-control": "Add Fiber Control",
    "edit-camera": "Edit Camera",
    "edit-fiber": "Edit Fiber",
    "edit-fiber-control": "Edit Fiber Control",
  };
  const [form] = Form.useForm();
  const [fiberControlType, setFiberControlType] = useState(1);
  const setLocation = (location: any) => {
    form.setFieldValue("location", location);
  };
  const getFiberForm = async () => {
    const { data } = await getFiberDetail(deviceId!);
    console.log(data);
    const { name, ip, zone, subzone, location } = data;

    form.setFieldsValue({
      name,
      ip,
      zone,
      subzone,
      location: location.map((line: any) =>
        line.map((point: any) => ArrayItemToFixed(point, 8))
      ),
    });
  };
  const getCameraForm = async () => {
    console.log(deviceId);

    const { data } = await getCameraDetail(deviceId!);
    console.log(data);
    const {
      name,
      ip,
      username,
      password,
      picurl,
      picport,
      videourl,
      videoport,
      location,
    } = data;
    form.setFieldsValue({
      name,
      ip,
      username,
      password,
      picurl,
      picport,
      videourl,
      videoport,
      location: ArrayItemToFixed(location, 8),
    });
  };
  const onFinish = async (value: any) => {
    console.log(value);

    if (operator === "add") {
      if (type === "camera") {
        await addCamera({ ...value, location: generateLines(value.location) });
      } else if (type === "fiber") {
        await addFiber({ ...value, location: generateLines(value.location) });
      }
    } else {
      if (type === "camera") {
        await updateCamera(deviceId!, {
          ...value,
          location: generateLines(value.location),
        });
      } else if (type === "fiber") {
        await setFiberDetail(deviceId!, {
          ...value,
          location: generateLines(value.location),
        });
      }
    }
    onClose();
  };
  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      return;
    }
    if (operator === "add") {
      form.setFieldValue(location, "");
    } else {
      if (type === "fiber") {
        getFiberForm();
      } else if (type === "camera") {
        getCameraForm();
      }
    }
  }, [isModalOpen]);
  return (
    <Modal
      style={{ top: 20 }}
      destroyOnClose
      title={null}
      footer={null}
      keyboard={false}
      maskClosable={false}
      open={isModalOpen}
      width={type === "fiber-control" ? 400 : 1100}
      onCancel={onClose}
      afterClose={onClose}
    >
      <p style={{ fontWeight: "bold" }}>{titleMap[`${operator}-${type}`]}</p>

      <div className={styles["container"]}>
        <div style={{ width: 400 }}>
          {type === "camera" && (
            <Form
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                className={styles["form-item"]}
                label="Name"
                name={"name"}
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Ip"
                name={"ip"}
                rules={[
                  { required: true, message: "Please input IP address!" },
                ]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Username"
                name={"username"}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Password"
                name={"password"}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Pic URL"
                name={"picurl"}
                rules={[{ required: true, message: "Please input pic URL!" }]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Pic Port"
                name={"picport"}
                rules={[{ required: true, message: "Please input pic port!" }]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Video URL"
                name={"videourl"}
                rules={[{ required: true, message: "Please input video URL!" }]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Video Port"
                name={"videoport"}
                rules={[
                  { required: true, message: "Please input video port!" },
                ]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Location"
                name={"location"}
                rules={[{ required: true, message: "Please input location!" }]}
              >
                <Input.TextArea autoSize disabled placeholder="auto select" />
              </Form.Item>

              <Form.Item
                className={styles["form-item"]}
                wrapperCol={{ offset: 16 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
          {type === "fiber" && (
            <Form
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                className={styles["form-item"]}
                label="Name"
                name={"name"}
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="control"
                name={"fiberControl"}
                rules={[
                  { required: true, message: "Please select fiber control!" },
                ]}
              >
                <Select
                  value={fiberControlType}
                  onChange={(value) => setFiberControlType(value)}
                  disabled={operator === "edit"}
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                  ]}
                ></Select>
              </Form.Item>
              {fiberControlType === 1 && (
                <>
                  <Form.Item
                    className={styles["form-item"]}
                    label="Zone"
                    name={"zone"}
                    rules={[
                      { required: true, message: "Please input the zone!" },
                    ]}
                  >
                    <Input placeholder="input" />
                  </Form.Item>
                  <Form.Item
                    className={styles["form-item"]}
                    label="Sub Zone"
                    name={"subzone"}
                    rules={[
                      { required: true, message: "Please input the sub zone!" },
                    ]}
                  >
                    <Input placeholder="input" />
                  </Form.Item>
                </>
              )}
              {fiberControlType === 2 && (
                <>
                  <Form.Item
                    className={styles["form-item"]}
                    label="Zone2"
                    name={"zone"}
                    rules={[
                      { required: true, message: "Please input the zone!" },
                    ]}
                  >
                    <Input placeholder="input" />
                  </Form.Item>
                  <Form.Item
                    className={styles["form-item"]}
                    label="Sub Zone2"
                    name={"subzone"}
                    rules={[
                      { required: true, message: "Please input the sub zone!" },
                    ]}
                  >
                    <Input placeholder="input" />
                  </Form.Item>
                </>
              )}
              <Form.Item
                className={styles["form-item"]}
                label="Location"
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
              <Form.Item
                className={styles["form-item"]}
                wrapperCol={{ offset: 16 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
          {type === "fiber-control" && (
            <Form
              form={form}
              labelAlign={"left"}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                className={styles["form-item"]}
                label="Name"
                name={"name"}
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Host Name"
                name={"ip"}
                rules={[
                  { required: true, message: "Please input the host name!" },
                ]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Port"
                name={"port"}
                rules={[{ required: true, message: "Please input the port!" }]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Type"
                name={"type"}
                rules={[{ required: true, message: "Please select the type!" }]}
              >
                <Select
                  disabled={operator === "edit"}
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                wrapperCol={{ offset: 16 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
        <div>
          {!(type === "fiber-control") && (
            <EditMap
              setLocation={(l: any) => setLocation(l)}
              type={type === "fiber" ? "LineString" : "Point"}
              draw={draw}
              setDraw={setDraw}
              layer={layer}
              setLayer={setLayer}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
