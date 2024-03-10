import { useModel, FormattedMessage } from "umi";
import { changeSelfPass } from "@/services/admin";
import { Form, Input, Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
interface IProps {
  open: boolean;
  onCancel: () => void;
}
export default (props: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { open, onCancel } = props;
  const { admin } = useModel("useAdminInfo");

  const {
    ChangePassword,
    CurrentPassword,
    NewPassword,
    ConfirmPassword,
    TwoInputsAreInConsistent,
    Success,
    PasswordRules,
  } = useModel("useLocaleText");

  const onFinish = async (values: any) => {
    console.log(values);

    const { currentPassword, newPassword } = values;
    setLoading(true);
    if (admin) await changeSelfPass(currentPassword, newPassword);
    setLoading(false);
    form.resetFields();
    onCancel();
    message.success(Success);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };
  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);
  return (
    <Modal
      style={{ top: 120 }}
      title={ChangePassword}
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
          label={CurrentPassword}
          name="currentPassword"
          rules={[
            { required: true },
            // {
            //   validator: (_, value) => {
            //     const regex =
            //       /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
            //     if (!value || regex.test(value)) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(PasswordRules + "(@$!%*?&)");
            //   },
            // },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={NewPassword}
          name="newPassword"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                const regex =
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
                if (!value || regex.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(PasswordRules + "(@$!%*?&)");
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={ConfirmPassword}
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(TwoInputsAreInConsistent);
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            <FormattedMessage id={"submit"} />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
