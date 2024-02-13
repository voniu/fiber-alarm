import { useEffect, useState } from "react";
import { useModel, history, useLocation } from "umi";

export default (Component: () => JSX.Element) => () => {
  const { isLogin, admin, loading } = useModel("useAdminInfo");
  const { setInitialState } = useModel("@@initialState");
  const [shouldRender, setShouldRender] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (!loading) {
      setShouldRender(true);
      setInitialState({ type: admin?.type });
      if (isLogin) {
        if (location.pathname === "/manage/login") {
          history.push("/manage/alarm");
          return;
        }
        history.push(location.pathname);
      } else history.push("/manage/login");
    }
  }, [isLogin, loading]);
  return shouldRender ? (
    <Component />
  ) : (
    location.pathname === "/manage/login" && null
  );
};
