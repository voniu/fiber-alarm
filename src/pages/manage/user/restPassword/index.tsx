import { Button, ConfigProvider, Form, Modal, Input, message } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.less";
interface IProps {
  id: number;
  isModalOpen: boolean;
  onCancel: () => void;
  reset: (id: number, password: string) => any;
  flush: () => void;
}
export default (props: IProps) => {
  const { isModalOpen, onCancel, reset, flush, id } = props;
  const [form] = Form.useForm();
  const onClose = () => {
    onCancel();
    form.resetFields();
  };
  const [loading, setLoading] = useState(false);

  const onFinish = async (value: any) => {
    console.log(value);
    setLoading(true);
    await reset(id, value.newpassword);
    message.success("success");
    setLoading(false);
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
          ResetPassword
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
                className={styles["form-item"]}
                label="Password"
                name={"newpassword"}
                rules={[{ required: true, message: "Please input" }]}
              >
                <Input.Password placeholder="input" />
              </Form.Item>

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
