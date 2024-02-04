import { useEffect } from "react";
import { useModel, history, useLocation } from "umi";

export default (Component: () => JSX.Element) => () => {
  const { isLogin } = useModel("useAdminInfo");
  const location = useLocation();
  useEffect(() => {
    console.log("admin", isLogin);

    if (isLogin) {
      if (location.pathname === "/manage/login") {
        history.push("/manage/currentAlarm");
        return;
      }
      history.push(location.pathname);
    } else history.push("/manage/login");
  }, [isLogin]);
  return <Component />;
};
