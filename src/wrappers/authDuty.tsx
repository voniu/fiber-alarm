import { useEffect, useState } from "react";
import { useModel, history } from "umi";

export default (Component: () => JSX.Element) => () => {
  const { isLogin, isOnDuty, loading } = useModel("useUserInfo");
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    if (!loading) {
      setShouldRender(true);
      if (isLogin && isOnDuty) {
        history.push("/home");
      } else if (isLogin && !isOnDuty) {
        history.push("/home/duty");
      } else {
        history.push("/home/login");
      }
    }
  }, [isLogin, isOnDuty, loading]);
  return shouldRender ? <Component /> : null;
};
