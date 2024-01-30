import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  Input,
  message,
  Select,
} from "antd";
import { useEffect } from "react";
import styles from "./index.less";
import { addGuard, addUser } from "@/services/admin";
interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
}
export default (props: IProps) => {
  const { isModalOpen, onCancel } = props;
  const [form] = Form.useForm();

  const onFinish = async (value: any) => {
    console.log(value);
    const { name, nickname, type } = value;
    if (type === 3) {
      await addGuard({ name, nickname });
    } else {
      await addUser({ name, nickname });
    }
    message.success("success");
    onCancel();
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
        onCancel={onCancel}
        forceRender
      >
        <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
          Add User Or Guard
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
              <Form.Item label={"Name"} name={"name"}>
                <Input />
              </Form.Item>
              <Form.Item label={"NickName"} name={"nickname"}>
                <Input />
              </Form.Item>
              <Form.Item label={"Identity"} name={"type"}>
                <Select
                  options={[
                    { value: 1, label: "admin" },
                    { value: 2, label: "manager" },
                    { value: 3, label: "guard" },
                  ]}
                />
              </Form.Item>
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
