import styles from "./index.less";
import { useState } from "react";
import { history, useModel, FormattedMessage, useIntl } from "umi";
import earth from "@/assets/dutyLogin/earth.png";
import userpng from "@/assets/dutyLogin/user.png";
import passwordpng from "@/assets/dutyLogin/password.png";
import WithAuth from "@/wrappers/authDuty";
import Logo from "@/assets/logo_new.png";
import { message } from "antd";
const Login = () => {
  const { login } = useModel("useUserInfo");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const intl = useIntl();
  const Account = intl.formatMessage({ id: "Account" });
  const Password = intl.formatMessage({ id: "Password" });
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
      <div className={styles["logo-img"]}>
        <img src={Logo} />
      </div>
      <div className={styles["earth"]}>
        <img src={earth} alt="" />
      </div>
      <div className={styles["form-container"]}>
        <div className={styles["title"]}>
          <span>
            <FormattedMessage id={"Integrated Security Operation Platform"} />
          </span>
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
              placeholder={Account}
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
              placeholder={Password}
            />
          </div>
          <div className={styles["input-container"]}>
            <div
              className={styles["button"]}
              onClick={submit}
              style={{ pointerEvents: `${loading ? "none" : "auto"}` }}
            >
              {loading ? (
                <span>
                  <FormattedMessage id={"loading"} />
                  ...
                </span>
              ) : (
                <span>
                  <FormattedMessage id={"Login"} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Login);
