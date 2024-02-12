import { adminLogin, adminLoginState, adminLogout } from "@/services/admin";
import { User } from "@/type";
import { isHome } from "@/utills";
import { message } from "antd";
import { useEffect, useState } from "react";
// interface LoginState {
//   isLogined: boolean;
//   user?: {
//     id: number;
//     name: string;
//     type: number;
//   };
//   isOnDuty: boolean; // 当前登录态是否处于值班状态
//   guard?: {
//     // 当前值班的保安
//     id: number;
//     name: string;
//   };
// }

export default function AdminInfo() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<User>();
  useEffect(() => {
    setLoading(true);
    if (!isHome()) {
      adminLoginState().then((res) => {
        if (!res.data) {
          message.info(res.msg);
          return;
        }
        const { isLogined, user } = res.data;
        setIsLogin(isLogined);
        if (isLogined) {
          setAdmin(user);
        }
        setLoading(false);
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { data, msg } = await adminLogin(username, password);
    if (!data) {
      message.info(msg);
      return;
    }
    setIsLogin(true);
    setAdmin(data.user);
  };
  const logout = async () => {
    await adminLogout();
    setIsLogin(false);
    setAdmin(undefined);
  };
  return {
    loading,
    isLogin,
    admin,
    login,
    logout,
  };
}
