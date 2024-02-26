import { useModel } from "umi";
import { changeSelfPass } from "@/services/admin";
import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
interface IProps {
  open: boolean;
  onCancel: () => void;
}
export default (props: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { open, onCancel } = props;
  const { admin } = useModel("useAdminInfo");
  const onFinish = async (values: any) => {
    console.log(values);

    const { currentPassword, newPassword } = values;
    setLoading(true);
    if (admin) await changeSelfPass(currentPassword, newPassword);
    setLoading(false);
    form.resetFields();
    onCancel();
    message.success("uğur");
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  return (
    <Modal
      style={{ top: 120 }}
      title={"Şifrəni dəyiş"}
      footer={null}
      keyboard={false}
      open={open}
      width={500}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="change_password"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Cari şifrə"
          name="currentPassword"
          rules={[
            { required: true, message: "zəhmət olmasa giriş current password" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Yeni şifrə"
          name="newPassword"
          rules={[
            { required: true, message: "zəhmət olmasa giriş Yeni şifrə" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Şifrəni təsdiqləyin"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "zəhmət olmasa giriş Şifrəni təsdiqləyin",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("İki giriş uyğunsuzdur");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            təqdim
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
