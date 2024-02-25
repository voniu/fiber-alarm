import { Button, Form, Input, Divider } from "antd";
import styles from "./index.less";
import { useEffect, useState } from "react";
import { history, useModel } from "umi";
import WithAuth from "@/wrappers/authAdmin";
const Login = () => {
  const { login, isLogin } = useModel("useAdminInfo");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const run = async (val: any) => {
    console.log(val);
    const { username, password } = val;
    setLoading(true);
    await login(username, password);
    setLoading(false);
    history.push("/manage/alarm");
  };
  useEffect(() => {
    console.log(isLogin);
  }, []);
  return (
    <div className={`${styles["login-container"]} ${styles["bg0"]}`}>
      <div className={styles.form}>
        <Form size="large" form={form} name="login" onFinish={run}>
          <Divider>
            <span className={styles.title}>{"Vəzifə İdarəetmə Sistemi"}</span>
          </Divider>

          <Form.Item
            name="username"
            label="İstifadəçi adı"
            labelCol={{ style: { width: 80 } }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Şifrə"
            labelCol={{ style: { width: 80 } }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" loading={loading} htmlType="submit">
              daxil ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WithAuth(Login);
