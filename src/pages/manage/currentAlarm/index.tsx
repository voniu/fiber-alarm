import WithAuth from "@/wrappers/authAdmin";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./index.less";
import AlarmDetailDrawer from "@/components/alarmDetailDrawer";
import dayjs from "@/utills/day";
import { AlarmDetail } from "@/models/useAlarms";
import { useModel } from "umi";

const Alarm = () => {
  // const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [dealId, setDealId] = useState<number>(-1);
  // const [loading, setLoading] = useState(false);
  const onClose = () => setOpen(false);
  const typeMap = ["intrusion", "tamper", "wire Disconnect", "Disconnect"];
  const { manageAlarm, messageLoading } = useModel("useAlarms");

  const columns: ColumnsType<AlarmDetail> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Fiber",
      dataIndex: "fiber",
      render: (text, record) => <a>{record.fiber.name}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 150,
      render: (_, record) => (
        <Tag color="#f50">{typeMap[record.type] || "none"}</Tag>
      ),
    },
    {
      title: "guard",
      dataIndex: "guard",
      render: (_, record) => <a>{record.guard?.name}</a>,
    },
    {
      title: "Time",
      dataIndex: "createTime",
      render: (_, record) => (
        <a>{dayjs(record.createTime).format("MMMM D, YYYY h:mm A")}</a>
      ),
    },
    {
      title: "Operator",
      dataIndex: "Operator",
      render: (_, record) => {
        return (
          <a
            style={{ color: "blue" }}
            onClick={() => {
              setOpen(true);
              setDealId(record.id);
            }}
          >
            {"deal with"}
          </a>
        );
      },
    },
  ];
  useEffect(() => {}, [manageAlarm]);

  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Current Alarm
      </p>
      <Table
        loading={messageLoading}
        rowKey={"id"}
        pagination={{
          pageSize: 7,
          showSizeChanger: false,
        }}
        columns={columns}
        dataSource={manageAlarm || []}
        bordered
      />
      <AlarmDetailDrawer open={open} onClose={onClose} alarmID={dealId} />
    </div>
  );
};
export default WithAuth(Alarm);
