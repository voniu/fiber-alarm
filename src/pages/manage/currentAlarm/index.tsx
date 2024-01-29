import { getAlarmList } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./index.less";
import AlarmDetailDrawer from "@/components/alarmDetailDrawer";
import dayjs from "@/utills/day";
import { AlarmDetail } from "@/models/useAlarms";

const Alarm = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [dealId, setDealId] = useState<number>(-1);
  const onClose = () => setOpen(false);
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
      title: "manager",
      dataIndex: "manager",
      render: (_, record) => <a>{record.manager?.name}</a>,
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
  useEffect(() => {
    getAlarmList({}).then((res) => {
      console.log(res);
      const { data } = res;
      setData(data);
    });
  }, []);

  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Current Alarm
      </p>
      <Table
        rowKey={"id"}
        pagination={{
          pageSize: 7,
        }}
        columns={columns}
        dataSource={data}
        bordered
      />
      <AlarmDetailDrawer open={open} onClose={onClose} alarmID={dealId} />
    </div>
  );
};
export default WithAuth(Alarm);
