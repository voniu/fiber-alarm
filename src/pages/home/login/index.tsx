import styles from "./index.less";
import { useCallback, useState } from "react";
import { history, useModel } from "umi";
import earth from "@/assets/dutyLogin/earth.png";
import userpng from "@/assets/dutyLogin/user.png";
import passwordpng from "@/assets/dutyLogin/password.png";
import WithAuth from "@/wrappers/auth";
const Login = () => {
  const { login } = useModel("useUserInfo");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = useCallback(async () => {
    setLoading(true);
    await login(username, password);
    setLoading(false);
    history.push("/home/duty");
    await login(username, password);
  }, [username, password]);

  return (
    <div className={styles["container"]}>
      <div className={styles["earth"]}>
        <img src={earth} alt="" />
      </div>
      <div className={styles["form-container"]}>
        <div className={styles["title"]}>
          <span>Duty System</span>
        </div>
        <div className={styles["form"]}>
          <div className={styles["input-container"]}>
            <i>
              <img src={userpng} alt="" />
            </i>
            <input
              autoComplete="false"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className={styles["input-container"]}>
            <i>
              <img src={passwordpng} alt="" />
            </i>

            <input
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className={styles["input-container"]}>
            <div className={styles["button"]} onClick={submit}>
              {loading ? <span>loading...</span> : <span>Login</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Login);