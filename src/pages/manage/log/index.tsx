import { getLog } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { List, Typography, message } from "antd";
import { LogInfo } from "@/type";
import dayjs from "@/utills/day";
const LogPage = () => {
  const [data, setData] = useState<LogInfo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchLog = async (page: number, pageSize: number) => {
    setLoading(true);
    setPage(page);
    const { success, msg, data, totalPage } = await getLog(page, pageSize);
    if (!success) {
      message.error(msg);
      return;
    }
    setLoading(false);

    setTotal(totalPage);
    setData(data);
  };
  useEffect(() => {
    fetchLog(page, pageSize);
  }, []);

  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Giriş Məlumatı
      </p>
      <List
        loading={loading}
        header={null}
        bordered
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: page,
          pageSize,
          total: total * pageSize,
          onChange: (page, pageSize) => {
            fetchLog(page, pageSize);
          },
          showSizeChanger: false,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Typography.Text key={"log-time"} mark>
                {item.createTime &&
                  dayjs(item.createTime).format("MMMM D, YYYY h:mm A")}
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
