import { Button, ConfigProvider, Form, Modal, Input, message } from "antd";
import { useEffect } from "react";
import styles from "./index.less";
import { addGuard, addUser } from "@/services/admin";
interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
  type: string;
  flush: () => void;
}
export default (props: IProps) => {
  const { isModalOpen, onCancel, type } = props;
  const [form] = Form.useForm();
  const onClose = () => {
    onCancel();
    form.resetFields();
  };
  const onFinish = async (value: any) => {
    console.log(value);
    const { name, nickname, type, flush, password } = value;
    if (type === 3) {
      await addGuard({ name, nickname });
    } else {
      await addUser({ name, nickname, type: 1, password });
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
                <Button type="primary" htmlType="submit">
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
