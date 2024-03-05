import { Button, ConfigProvider, Form, Modal, Input, message } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { useModel } from "umi";
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

  const { ResetPassword, Success, Password, Submit } =
    useModel("useLocaleText");
  const onClose = () => {
    onCancel();
    form.resetFields();
  };
  const [loading, setLoading] = useState(false);

  const onFinish = async (value: any) => {
    console.log(value);
    setLoading(true);
    const { success, msg } = await reset(id, value.newpassword);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
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
          {ResetPassword}
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
            <Form form={form} onFinish={onFinish} labelAlign="right">
              <Form.Item
                className={styles["form-item"]}
                label={Password}
                name={"newpassword"}
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="" />
              </Form.Item>

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {Submit}
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
    </>
  );
};
