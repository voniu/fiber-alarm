import WithAuth from "@/wrappers/auth";
import styles from "./index.less";
const FiberSensitivity = () => {
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Fiber Sensitivity
      </p>
      <div className={styles["right-form"]}>
        <p className={styles["title"]}>Set up Fiber Sensitivity</p>
        <div className={styles["form-container"]}></div>
      </div>
    </div>
  );
};

export default WithAuth(FiberSensitivity);
