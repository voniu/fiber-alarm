import { adminLogin, adminLoginState, adminLogout } from "@/services/admin";
import { User } from "@/type";
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
  const [admin, setAdmin] = useState<User>();

  useEffect(() => {
    adminLoginState().then((data) => {
      const { isLogined, user } = data;
      setIsLogin(isLogined);
      if (isLogined) {
        setAdmin(user);
      }
    });
  }, []);

  const login = async (username: string, password: string) => {
    const data = await adminLogin(username, password);
    setAdmin(data.user);
  };
  const logout = () => {
    adminLogout();
    setAdmin(undefined);
  };
  return {
    isLogin,
    admin,
    login,
    logout,
  };
}
