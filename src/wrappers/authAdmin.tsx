import { useEffect } from "react";
import { useModel, history, useLocation } from "umi";

export default (Component: () => JSX.Element) => () => {
  const { isLogin, admin } = useModel("useAdminInfo");
  const { setInitialState } = useModel("@@initialState");
  const location = useLocation();
  useEffect(() => {
    setInitialState({ type: admin?.type });
    if (isLogin) {
      if (location.pathname === "/manage/login") {
        history.push("/manage/alarm");
        return;
      }
      history.push(location.pathname);
    } else history.push("/manage/login");
  }, [isLogin]);
  return <Component />;
};
