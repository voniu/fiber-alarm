import {
  monitorLogin,
  monitorLoginState,
  monitorLogout,
  offDuty,
  onDuty,
  resumeDuty,
} from "@/services/monitor";
import { isHome } from "@/utills";
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
  const [loading, setLoading] = useState(true);
  const [guard, setGuard] = useState<LoginState["guard"]>();
  const [monitor, setMonitor] = useState<LoginState["user"]>();
  useEffect(() => {
    if (isHome()) {
      setLoading(true);
      monitorLoginState().then((res: LoginState) => {
        const { isLogined, user, isOnDuty, guard } = res;
        setIsLogin(isLogined);
        if (isLogined) {
          setMonitor(user);
          setDuty(isOnDuty);
          if (isOnDuty) setGuard(guard);
        }
        setLoading(false);
      });
    }
  }, [isOnDuty]);

  const login = async (username: string, password: string) => {
    const { success, data, msg } = await monitorLogin(username, password);
    if (success) {
      setIsLogin(true);
      setMonitor(data.user);
    }
    return { success, data, msg };
  };
  const logout = async () => {
    const { success, data, msg } = await monitorLogout();
    if (success) {
      setIsLogin(false);
      setMonitor(undefined);
    }
    return { success, data, msg };
  };
  const setGuards = async (guardId: number) => {
    const { success, msg } = await onDuty(guardId);
    if (success) {
      setDuty(true);
    }
    return { success, msg };
  };
  const unsetGuards = async (password: string) => {
    const { success, msg } = await offDuty(password);
    if (success) {
      setDuty(false);
      setGuard(undefined);
    }
    return { success, msg };
  };
  const resumeGuards = async () => {
    await resumeDuty();
    setDuty(true);
  };
  return {
    loading,
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
