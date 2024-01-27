import { useEffect } from "react";
import { useModel, history } from "umi";

export default (Component: () => JSX.Element) => () => {
  const { isLogin, isOnDuty } = useModel("useUserInfo");
  console.log("TTT", isLogin);
  useEffect(() => {
    if (isLogin && isOnDuty) {
      history.push("/home");
    } else if (isLogin && !isOnDuty) {
      history.push("/home/duty");
    } else {
      history.push("/home/login");
    }
  }, []);
  return <Component />;
};
