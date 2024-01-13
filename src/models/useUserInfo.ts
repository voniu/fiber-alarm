import { monitorLogin, monitorLogout } from "@/services/monitor";
import { User } from "@/type";
import { useState } from "react";

export default function UserInfo() {
  const [currentUser, setCurrentUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const login = async (username: string, password: string) => {
    const user = await monitorLogin(username, password);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser({
      ...currentUser,
      ...user,
    });
  };
  const logout = () => {
    monitorLogout();
    localStorage.removeItem("user");
    setCurrentUser({
      name: "",
      password: "",
      type: -1,
    });
  };

  return {
    isLogin: !!localStorage.getItem("user"),
    currentUser,
    login,
    logout,
  };
}
