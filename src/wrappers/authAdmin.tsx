import { useEffect } from "react";
import { useModel, Navigate, history, useLocation } from "umi";

export default (Component: () => JSX.Element) => () => {
  const { isLogin } = useModel("useAdminInfo");
  const location = useLocation();
  useEffect(() => {
    if (isLogin && location.pathname === "/manage/login") {
      history.push("/manage/currentAlarm");
    }
  }, []);
  return isLogin ? <Component /> : <Navigate to={"/manage/login"} />;
};
