import Logo from "@/assets/logo_new.png";
import styles from "./index.less";
import { FormattedMessage } from "umi";
export default function HeaderTitle() {
  return (
    <div className={styles["logo"]}>
      <div className={styles["logo-img"]}>
        <img src={Logo} />
      </div>
      <span className={styles["header-title"]}>
        <FormattedMessage id={"Super administration System"} />
      </span>
    </div>
  );
}
