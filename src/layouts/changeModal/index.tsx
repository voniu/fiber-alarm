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
    message.success("success");
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  return (
    <Modal
      style={{ top: 120 }}
      title={"Change Password"}
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
          label="current password"
          name="currentPassword"
          rules={[{ required: true, message: "Please input current password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="new password"
          name="newPassword"
          rules={[{ required: true, message: "Please input new password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="confirm password"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Two inputs are inconsistent");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
