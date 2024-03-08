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
  const { isModalOpen, onCancel, type: listType, flush } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { admin } = useModel("useAdminInfo");
  const {
    Add,
    Success,
    Officer,
    Submit,
    Guarder,
    Name,
    NickName,
    Identity,
    Password,
    Admin,
  } = useModel("useLocaleText");
  const onClose = () => {
    onCancel();
    form.resetFields();
  };
  const onFinish = async (value: any) => {
    console.log(value);
    setLoading(true);
    const { name, nickname, password, type } = value;
    // form.setFieldValue("type", type);
    if (listType === "guard") {
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
    message.success(Success);
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
        width={430}
        onCancel={onClose}
        forceRender
      >
        <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
          {Add} {`${listType === "user" ? Officer : Guarder}`}
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
              form={form}
              onFinish={onFinish}
              labelAlign="right"
              initialValues={{ type: 2 }}
            >
              <Form.Item
                label={Name}
                name={"name"}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              {listType === "user" && (
                <>
                  <Form.Item
                    label={NickName}
                    name={"nickname"}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={Identity}
                    name={"type"}
                    rules={[{ required: true }]}
                  >
                    <Select
                      disabled={admin?.type !== 0}
                      options={[
                        { value: 1, label: Admin },
                        { value: 2, label: Officer },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    className={styles["form-item"]}
                    label={Password}
                    name={"password"}
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="" />
                  </Form.Item>
                </>
              )}

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
