import {
  monitorLogin,
  monitorLoginState,
  monitorLogout,
  offDuty,
  onDuty,
  resumeDuty,
} from "@/services/monitor";
import { useEffect, useState } from "react";
interface LoginState {
  isLogined: boolean;
  user?: {
    id: number;
    name: string;
    type: number;
  };
  isOnDuty: boolean; // 当前登录态是否处于值班状态
  guard?: {
    // 当前值班的保安
    id: number;
    name: string;
  };
}

export default function UserInfo() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOnDuty, setDuty] = useState(false);
  const [guard, setGuard] = useState<LoginState["guard"]>();
  const [monitor, setMonitor] = useState<LoginState["user"]>();
  useEffect(() => {
    monitorLoginState().then((res: LoginState) => {
      const { isLogined, user, isOnDuty, guard } = res;
      setIsLogin(isLogined);
      if (isLogined) {
        setMonitor(user);
        setDuty(isOnDuty);
        if (isOnDuty) setGuard(guard);
      }
    });
  }, []);

  const login = async (username: string, password: string) => {
    const data = await monitorLogin(username, password);
    setMonitor(data.user);
  };
  const logout = () => {
    monitorLogout();
    setMonitor(undefined);
  };
  const setGuards = async (guardId: number) => {
    await onDuty(guardId);
  };
  const unsetGuards = async (password: string) => {
    await offDuty(password);
  };
  const resumeGuards = async () => {
    await resumeDuty();
  };
  return {
    isLogin,
    monitor,
    isOnDuty,
    guard,
    login,
    logout,
    setGuards,
    unsetGuards,
    resumeGuards,
  };
}
