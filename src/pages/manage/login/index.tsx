import { Button, Form, Input, Divider } from "antd";
import styles from "./index.less";
import { useState } from "react";
import { history, useModel } from 'umi'
const Login = () => {
  const { login } = useModel('useUserInfo')
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const run = async (val: any) => {
    console.log(val);
    const { username, password } = val;
    setLoading(true);
    await login(username, password);
    setLoading(false);
    history.push("/manage")
  };
  return (
    <div className={styles.form}>
      <Form size="large" form={form} name="login" onFinish={run}>
        <Divider>
          <span className={styles.title}>{"Duty System"}</span>
        </Divider>

        <Form.Item
          name="username"
          label="username"
          labelCol={{ style: { width: 80 } }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="password"
          labelCol={{ style: { width: 80 } }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" loading={loading} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;