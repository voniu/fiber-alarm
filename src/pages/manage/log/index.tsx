import { getLog } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { List, Typography } from "antd";
import { LogInfo } from "@/type";
import dayjs from "@/utills/day";
const LogPage = () => {
  const [data, setData] = useState<LogInfo[]>([]);
  const fetchLog = async () => {
    const { data } = await getLog();
    setData(data);
  };
  useEffect(() => {
    fetchLog();
  }, []);

  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Log Information
      </p>
      <List
        header={null}
        bordered
        pagination={{ pageSize: 10 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Typography.Text key={"log-time"} mark>
                {dayjs(item.createTime).format("MMMM D, YYYY h:mm A")}
              </Typography.Text>,
            ]}
          >
            {item.detail}
          </List.Item>
        )}
      />
    </div>
  );
};
export default WithAuth(LogPage);
