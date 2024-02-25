import styles from "./index.less";
import { useState } from "react";
import { history, useModel } from "umi";
import earth from "@/assets/dutyLogin/earth.png";
import userpng from "@/assets/dutyLogin/user.png";
import passwordpng from "@/assets/dutyLogin/password.png";
import WithAuth from "@/wrappers/authDuty";
import { message } from "antd";
const Login = () => {
  const { login } = useModel("useUserInfo");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async () => {
    setLoading(true);
    const { success, msg } = await login(username, password);
    if (!success) {
      message.error(msg);
      setLoading(false);
      return;
    }
    setLoading(false);
    history.push("/home/duty");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["earth"]}>
        <img src={earth} alt="" />
      </div>
      <div className={styles["form-container"]}>
        <div className={styles["title"]}>
          <span>Vəzifə sistemi</span>
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
              placeholder="İstifadəçi adı"
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
              placeholder="Şifrə"
            />
          </div>
          <div className={styles["input-container"]}>
            <div
              className={styles["button"]}
              onClick={submit}
              style={{ pointerEvents: `${loading ? "none" : "auto"}` }}
            >
              {loading ? <span>yüklənir...</span> : <span>daxil ol</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Login);
