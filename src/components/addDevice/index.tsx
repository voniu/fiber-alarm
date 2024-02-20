import EditMap from "@/components/editMap";
import { Form, Modal, Input, Button, Select, message } from "antd";
import styles from "./index.less";
import { useEffect, useState } from "react";
import {
  addCamera,
  addControl,
  addFiber,
  getCameraDetail,
  getFiberControl,
  getFiberDetail,
  setFiberDetail,
  updateCamera,
  updateControl,
} from "@/services/admin";
import { deviceType } from "@/constant";
interface IProps {
  operator: string;
  isModalOpen: boolean;
  type: string;
  deviceId?: number;
  device?: any;
  onClose: () => void;
  draw: any;
  setDraw: (val: any) => void;
  layer: any;
  setLayer: (val: any) => void;
  flush: () => void;
}
export default (props: IProps) => {
  const {
    device,
    operator,
    deviceId,
    isModalOpen,
    type,
    onClose,
    draw,
    setDraw,
    layer,
    setLayer,
    flush,
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
  const [fiberControl, setFiberControl] = useState<{
    id: number;
    name: string;
    type: number;
  }>({
    id: -1,
    name: "",
    type: -1,
  });
  const [contorlOptions, setContorlOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initLocation, setInitLocation] = useState<number[]>();
  const setLocation = (location: any) => {
    form.setFieldValue("location", location);
  };
  const getFiberControlOp = async () => {
    const { data } = await getFiberControl("", false);
    const c = data.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
        type: item.type,
      };
    });
    setContorlOptions(c);
  };
  const onSelectChange = (value: any, option: any) => {
    setFiberControl({
      name: option.label,
      type: option.type,
      id: option.value,
    });
  };
  const getFiberForm = async () => {
    const { data } = await getFiberDetail(deviceId!);
    const { name, device, location, identifier } = data;
    setInitLocation(location);
    if (!identifier) {
      form.setFieldsValue({
        name,
        zone: "",
        subzone: "",
        location: JSON.stringify(location),
      });
      return;
    }
    const type = identifier.length === 1 ? 1 : 0;

    setFiberControl(device);
    if (type === 0) {
      form.setFieldsValue({
        name,
        fiberControl: device.id,
        zone: identifier[0],
        subzone: identifier[1],
        location: JSON.stringify(location),
      });
    } else {
      form.setFieldsValue({
        name,
        fiberControl: device.id,
        zone: identifier[0],
        location: JSON.stringify(location),
      });
    }
  };
  const getCameraForm = async () => {
    const { data } = await getCameraDetail(deviceId!);
    const {
      name,
      host,
      username,
      password,
      snapshotPath,
      snapshotPort,
      streamPort,
      streamPath,
      location,
    } = data;
    setInitLocation(location);
    form.setFieldsValue({
      name,
      host,
      username,
      password,
      snapshotPath,
      snapshotPort,
      streamPort,
      streamPath,
      location: JSON.stringify(location),
    });
  };
  const getControlForm = async () => {
    const { deviceContent } = device;
    const { name, host, port, type } = deviceContent;
    form.setFieldsValue({
      name,
      host,
      port,
      type,
    });
  };
  const onFinish = async (value: any) => {
    setLoading(true);
    if (operator === "add") {
      if (type === "camera") {
        const { success, msg } = await addCamera({
          ...value,
          location: value.location,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber") {
        const { fiberControl, name, zone, subzone } = value;
        let identify;
        if (subzone) {
          identify = [Number(zone), Number(subzone)];
        } else {
          identify = [Number(zone)];
        }
        const { success, msg } = await addFiber({
          deviceId: fiberControl,
          name,
          identifier: identify,
          location: value.location,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber-control") {
        const { success, msg } = await addControl(value);
        if (!success) {
          message.error(msg);
        }
      }
    } else {
      if (type === "camera") {
        const { success, msg } = await updateCamera(deviceId!, {
          ...value,
          location: value.location,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber") {
        const { name, zone, subzone } = value;
        const { success, msg } = await setFiberDetail(deviceId!, {
          name,
          identifier: [zone, subzone],
          location: value.location,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber-control") {
        const { success, msg } = await updateControl(deviceId!, value);
        if (!success) {
          message.error(msg);
        }
      }
    }
    setLoading(false);
    onClose();
    flush();
  };
  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      return;
    }
    if (operator === "add") {
      if (type === "fiber") {
        getFiberControlOp();
      }
      form.setFieldValue(location, "");
    } else {
      if (type === "fiber") {
        getFiberForm();
      } else if (type === "camera") {
        getCameraForm();
      } else if (type === "fiber-control") {
        getControlForm();
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
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Host"
                name={"host"}
                rules={[{ required: true, message: "Please input the Host" }]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Username"
                name={"username"}
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Password"
                name={"password"}
                rules={[
                  { required: true, message: "Please input the password!" },
                ]}
              >
                <Input.Password placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="SnapshotPath"
                name={"snapshotPath"}
                rules={[
                  { required: true, message: "Please input the snapshotPath!" },
                ]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="SnapshotPort"
                name={"snapshotPort"}
                rules={[
                  { required: true, message: "Please input snapshotPort!" },
                  {
                    validator: async (_, value) => {
                      const regex = /^\d+$/;
                      if (!regex.test(value)) {
                        return Promise.reject("Please input numbers only!");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="StreamPath"
                name={"streamPath"}
                rules={[
                  { required: true, message: "Please input streamPath!" },
                ]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="StreamPort"
                name={"streamPort"}
                rules={[
                  { required: true, message: "Please input streamPort!" },
                  {
                    validator: async (_, value) => {
                      const regex = /^\d+$/;
                      if (!regex.test(value)) {
                        return Promise.reject("Please input numbers only!");
                      }
                      return Promise.resolve();
                    },
                  },
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
                <Button type="primary" htmlType="submit" loading={loading}>
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
                rules={[{ required: true, message: "Please input the name!" }]}
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
                  optionLabelProp="label"
                  optionFilterProp="label"
                  onChange={onSelectChange}
                  disabled={operator === "edit"}
                  options={contorlOptions}
                ></Select>
              </Form.Item>
              {fiberControl.type === 0 && (
                <>
                  <Form.Item
                    className={styles["form-item"]}
                    label="Zone"
                    name={"zone"}
                    rules={[
                      { required: true, message: "Please input the zone!" },
                      {
                        validator: async (_, value) => {
                          const regex = /^\d+$/;
                          if (!regex.test(value)) {
                            return Promise.reject("Please input numbers only!");
                          }
                          return Promise.resolve();
                        },
                      },
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
                      {
                        validator: async (_, value) => {
                          const regex = /^\d+$/;
                          if (!regex.test(value)) {
                            return Promise.reject("Please input numbers only!");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="input" />
                  </Form.Item>
                </>
              )}
              {fiberControl.type === 1 && (
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
                <Button type="primary" htmlType="submit" loading={loading}>
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
                name={"host"}
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
                rules={[
                  { required: true, message: "Please input the port!" },
                  {
                    validator: async (_, value) => {
                      const regex = /^\d+$/;
                      if (!regex.test(value)) {
                        return Promise.reject("Please input numbers only!");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
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
                    { label: deviceType[0], value: 0 },
                    { label: deviceType[1], value: 1 },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                wrapperCol={{ offset: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
        <div>
          {!(type === "fiber-control") && (
            <EditMap
              initLocation={initLocation}
              setLocation={(l: any) => setLocation(l)}
              id={deviceId}
              type={type === "fiber" ? "LineString" : "Point"}
              draw={draw}
              setDraw={setDraw}
              layer={layer}
              setLayer={setLayer}
              isEdit={operator === "edit"}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
