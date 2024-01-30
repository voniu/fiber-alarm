import { getLog } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { List } from "antd";
import { LogInfo } from "@/type";
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
        header={<div style={{ fontSize: 18, height: 20 }}>Log List</div>}
        bordered
        pagination={{ pageSize: 10 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
          // actions={[
          //   <Typography.Text key={"log-time"} mark>
          //     Ant Design (mark)
          //   </Typography.Text>,
          // ]}
          >
            {item.detail}
          </List.Item>
        )}
      />
    </div>
  );
};
export default WithAuth(LogPage);
