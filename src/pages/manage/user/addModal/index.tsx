import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  Input,
  message,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { addGuard, addUser } from "@/services/admin";
import { useModel } from "umi";
interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
  type: string;
  flush: () => void;
}
export default (props: IProps) => {
  const { isModalOpen, onCancel, type, flush } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { admin } = useModel("useAdminInfo");
  const onClose = () => {
    onCancel();
    form.resetFields();
  };
  const onFinish = async (value: any) => {
    console.log(value);
    setLoading(true);
    const { name, nickname, password, type } = value;
    form.setFieldValue("type", type);
    if (type === "guard") {
      const { success, msg } = await addGuard({ name, nickname });
      setLoading(false);
      if (!success) {
        message.error(msg);
        return;
      }
    } else {
      const { success, msg } = await addUser({
        name,
        nickname,
        type,
        password,
      });
      setLoading(false);
      if (!success) {
        message.error(msg);
        return;
      }
    }
    message.success("success");
    onClose();
    flush();
  };
  useEffect(() => {
    form.resetFields();
  }, []);
  return (
    <>
      <Modal
        style={{ top: 120 }}
        title={null}
        footer={null}
        keyboard={false}
        open={isModalOpen}
        width={400}
        onCancel={onClose}
        forceRender
      >
        <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
          Add {`${type === "user" ? "Manager" : "Guard"}`}
        </p>
        <div className={styles["main"]}>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelFontSize: 16,
                  labelColor: "#000",
                  labelColonMarginInlineEnd: 15,
                  itemMarginBottom: 20,
                },
              },
            }}
          >
            <Form
              style={{
                width: 250,
              }}
              form={form}
              onFinish={onFinish}
              labelAlign="right"
              initialValues={{ type: 2 }}
            >
              <Form.Item
                label={"Name"}
                name={"name"}
                rules={[{ required: true, message: "Please input" }]}
              >
                <Input />
              </Form.Item>

              {type === "user" && (
                <>
                  <Form.Item
                    label={"NickName"}
                    name={"nickname"}
                    rules={[{ required: true, message: "Please input" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={"Identity"}
                    name={"type"}
                    rules={[{ required: true, message: "Please input" }]}
                  >
                    <Select
                      disabled={admin?.type !== 0}
                      options={[
                        { value: 1, label: "admin" },
                        { value: 2, label: "manager" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    className={styles["form-item"]}
                    label="Password"
                    name={"password"}
                    rules={[{ required: true, message: "Please input" }]}
                  >
                    <Input.Password placeholder="input" />
                  </Form.Item>
                </>
              )}

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  submit
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
    </>
  );
};
