import EditMap from "@/components/editMap";
import { Form, Modal, Input, Button } from "antd";
import styles from "./index.less";
import { useEffect } from "react";
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
  addType: string;
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
    addType,
    onClose,
    draw,
    setDraw,
    layer,
    setLayer,
  } = props;
  const titleMap: any = {
    "add-camera": "Add Camera",
    "add-fiber": "Add fiber",
    "edit-camera": "Edit Camera",
    "edit-fiber": "Edit Fiber",
  };
  const [form] = Form.useForm();
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
      if (addType === "camera") {
        await addCamera({ ...value, location: generateLines(value.location) });
      } else if (addType === "fiber") {
        await addFiber({ ...value, location: generateLines(value.location) });
      }
    } else {
      if (addType === "camera") {
        await updateCamera(deviceId!, {
          ...value,
          location: generateLines(value.location),
        });
      } else if (addType === "fiber") {
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
      if (addType === "fiber") {
        getFiberForm();
      } else if (addType === "camera") {
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
      width={1100}
      onCancel={onClose}
      afterClose={onClose}
    >
      <p style={{ fontWeight: "bold" }}>{titleMap[`${operator}-${addType}`]}</p>

      <div className={styles["container"]}>
        <div style={{ width: 400 }}>
          {addType === "camera" && (
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
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item className={styles["form-item"]} label="Ip" name={"ip"}>
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="username"
                name={"username"}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="password"
                name={"password"}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="picurl"
                name={"picurl"}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="pic port"
                name={"picport"}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="video url"
                name={"videourl"}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="video port"
                name={"videoport"}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Location"
                name={"location"}
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
          {addType === "fiber" && (
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
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item className={styles["form-item"]} label="Ip" name={"ip"}>
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Zone"
                name={"zone"}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Sub Zone"
                name={"subzone"}
              >
                <Input placeholder="input" />
              </Form.Item>
              <Form.Item
                className={styles["form-item"]}
                label="Location"
                name={"location"}
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
        </div>
        <div>
          <EditMap
            setLocation={(l: any) => setLocation(l)}
            type={addType === "fiber" ? "LineString" : "Point"}
            draw={draw}
            setDraw={setDraw}
            layer={layer}
            setLayer={setLayer}
          />
        </div>
      </div>
    </Modal>
  );
};
