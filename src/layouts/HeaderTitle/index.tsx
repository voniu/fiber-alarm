import Logo from "@/assets/logo_new.png";
import styles from "./index.less";
export default function HeaderTitle() {
  return (
    <div className={styles["logo"]}>
      <div className={styles["logo-img"]}>
        <img src={Logo} />
      </div>
      <span className={styles["header-title"]}>Duty Manage System</span>
    </div>
  );
}
