import EditMap from "@/components/editMap";
import {
  Form,
  Modal,
  Input,
  Button,
  Select,
  message,
  Collapse,
  CollapseProps,
} from "antd";
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
import { cameraFactory, cameraFormType, deviceType } from "@/constant";
import { useModel } from "umi";
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
  const {
    AddCamera,
    AddFiber,
    AddFiberOpticHost,
    EditCamera,
    EditFiber,
    EditFiberOpticHost,
    Name,
    Host,
    Username,
    SnapshotPort,
    SnapshotChannel,
    StreamPort,
    StreamChannel,
    Port,
    Password,
    Location,
    Submit,
    FiberOpticHost,
    ZoneNo,
    SubZoneNo,
    AutoSelect,
    Type,
    LocationDesc,
    PleaseInputNumber,
    LayingText,
    LengthText,
    AdvancedSettings,
    CameraType,
  } = useModel("useLocaleText");

  const titleMap: any = {
    "add-camera": AddCamera,
    "add-fiber": AddFiber,
    "add-fiber-control": AddFiberOpticHost,
    "edit-camera": EditCamera,
    "edit-fiber": EditFiber,
    "edit-fiber-control": EditFiberOpticHost,
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
        const { streamPort, snapshotPort } = value;
        const { success, msg } = await addCamera({
          ...value,
          streamPort: Number(streamPort),
          snapshotPort: Number(snapshotPort),
          location: value.location,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber") {
        const {
          fiberControl,
          name,
          zone,
          subzone,
          locationDesc,
          layingMethod,
          length,
        } = value;
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
          locationDesc,
          layingMethod,
          length,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber-control") {
        const { port } = value;
        const { success, msg } = await addControl({
          ...value,
          port: Number(port),
        });
        if (!success) {
          message.error(msg);
        }
      }
    } else {
      if (type === "camera") {
        const { streamPort, snapshotPort } = value;
        const { success, msg } = await updateCamera(deviceId!, {
          ...value,
          streamPort: Number(streamPort),
          snapshotPort: Number(snapshotPort),
          location: value.location,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber") {
        const { name, zone, subzone, locationDesc, layingMethod, length } =
          value;
        let identify;
        if (subzone) {
          identify = [Number(zone), Number(subzone)];
        } else {
          identify = [Number(zone)];
        }
        const { success, msg } = await setFiberDetail(deviceId!, {
          name,
          identifier: identify,
          location: value.location,
          locationDesc,
          layingMethod,
          length,
        });
        if (!success) {
          message.error(msg);
        }
      } else if (type === "fiber-control") {
        const { port } = value;
        const { success, msg } = await updateControl(deviceId!, {
          ...value,
          port: Number(port),
        });
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
      if (type === "camera") {
        form.setFieldValue("streamChannel", 2);
        form.setFieldValue("streamPort", 554);
        form.setFieldValue("snapshotPort", 80);
        form.setFieldValue("snapshotChannel", 1);
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
  const cameraDeepConfig: CollapseProps["items"] = [
    {
      key: "1",
      label: AdvancedSettings,
      forceRender: true,
      children: (
        <>
          <Form.Item
            labelCol={{ span: 10 }}
            className={styles["form-item"]}
            label={SnapshotChannel}
            name={"snapshotChannel"}
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: 100 }}
              options={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
              ]}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }}
            className={styles["form-item"]}
            label={SnapshotPort}
            name={"snapshotPort"}
            rules={[
              { required: true },
              {
                validator: async (_, value) => {
                  const regex = /^\d+$/;
                  if (!regex.test(value)) {
                    return Promise.reject(`${PleaseInputNumber}!`);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input style={{ width: 100 }} placeholder="" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }}
            className={styles["form-item"]}
            label={StreamChannel}
            name={"streamChannel"}
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: 100 }}
              options={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
              ]}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }}
            className={styles["form-item"]}
            label={StreamPort}
            name={"streamPort"}
            rules={[
              { required: true },
              {
                validator: async (_, value) => {
                  const regex = /^\d+$/;
                  if (!regex.test(value)) {
                    return Promise.reject(`${PleaseInputNumber}!`);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input style={{ width: 100 }} placeholder="" />
          </Form.Item>
        </>
      ),
    },
  ];
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
        <div style={{ width: 420, marginRight: 2 }}>
          <div
            className="overflow-style"
            style={{
              maxHeight: 560,
              height: type === "fiber-control" ? "auto" : 560,
            }}
          >
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
                  label={Name}
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Host}
                  name={"host"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Type}
                  name={"type"}
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { label: cameraFactory[0], value: 0 },
                      { label: cameraFactory[1], value: 1 },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={CameraType}
                  name={"form"}
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { label: cameraFormType[0], value: 0 },
                      { label: cameraFormType[1], value: 1 },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={LocationDesc}
                  name={"locationDesc"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Username}
                  name={"username"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Password}
                  name={"password"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Location}
                  name={"location"}
                  rules={[{ required: true }]}
                >
                  <Input.TextArea autoSize disabled placeholder={AutoSelect} />
                </Form.Item>
                <Collapse
                  items={cameraDeepConfig}
                  size="small"
                  style={{ width: 350, marginBottom: 5 }}
                />
                <Form.Item
                  className={styles["form-item"]}
                  wrapperCol={{ offset: 16 }}
                >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {Submit}
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
                  label={Name}
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={FiberOpticHost}
                  name={"fiberControl"}
                  rules={[{ required: true }]}
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
                      label={ZoneNo}
                      name={"zone"}
                      rules={[
                        { required: true },
                        {
                          validator: async (_, value) => {
                            const regex = /^\d+$/;
                            if (!regex.test(value)) {
                              return Promise.reject(`${PleaseInputNumber}!`);
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
                      label={SubZoneNo}
                      name={"subzone"}
                      rules={[
                        { required: true },
                        {
                          validator: async (_, value) => {
                            const regex = /^\d+$/;
                            if (!regex.test(value)) {
                              return Promise.reject(`${PleaseInputNumber}!`);
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </>
                )}
                {fiberControl.type === 1 && (
                  <>
                    <Form.Item
                      className={styles["form-item"]}
                      label={ZoneNo}
                      name={"zone"}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </>
                )}
                <Form.Item
                  className={styles["form-item"]}
                  label={LocationDesc}
                  name={"locationDesc"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={LayingText}
                  name={"layingMethod"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={LengthText}
                  name={"length"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Location}
                  name={"location"}
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    autoSize={{ maxRows: 4 }}
                    disabled
                    placeholder={AutoSelect}
                  />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  wrapperCol={{ offset: 16 }}
                >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {Submit}
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
                  label={Name}
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Host}
                  name={"host"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  className={styles["form-item"]}
                  label={Port}
                  name={"port"}
                  rules={[
                    { required: true },
                    {
                      validator: async (_, value) => {
                        const regex = /^\d+$/;
                        if (!regex.test(value)) {
                          return Promise.reject(`${PleaseInputNumber}!`);
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
                  label={Type}
                  name={"type"}
                  rules={[{ required: true }]}
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
                    {Submit}
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
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
