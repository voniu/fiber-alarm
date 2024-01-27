import { getAlarmList } from "@/services/admin";
import WithAuth from "@/wrappers/auth";
import { DatePicker, Select, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./index.less";
import AlarmDetailDrawer from "@/components/alarmDetailDrawer";
interface AlarmDetail {
  key?: string;
  id: number;
  name: string;
  fiber: {
    id: number;
    name: string;
  };
  description: string;
  status: number;
  guard?: {
    id: number;
    name: string;
    log: string;
  };
  manager?: {
    id: number;
    name: string;
    log: string;
  };
}

const Alarm = () => {
  const initDetail = {
    id: -1,
    name: "",
    fiber: { id: -1, name: "" },
    status: 0,
    description: "",
    guard: { id: -1, name: "", log: "" },
    manager: { id: -1, name: "", log: "" },
  };
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<AlarmDetail>(initDetail);
  const statusMap = ["pending", "processing", "solved"];
  const colorMap = ["default", "processing", "success"];
  const onClose = () => setOpen(false);
  const columns: ColumnsType<AlarmDetail> = [
    {
      title: "Name",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Fiber",
      dataIndex: "fiber",
      render: (text, record) => <a>{record.fiber.name}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Tag color={colorMap[record.status]}>{statusMap[record.status]}</Tag>
      ),
    },
    {
      title: "Operator",
      render: (_, record) => {
        return (
          <a
            style={{ color: "blue" }}
            onClick={() => {
              setOpen(true);
              setDetail(record);
            }}
          >
            {"Detail"}
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
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>AlarmList</p>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "10px 0" }}>
          <span>status: </span>
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={() => {}}
            options={[
              { value: "all", label: "all" },
              { value: "pending", label: "pending" },
              { value: "processing1", label: "processing|(my)" },
              { value: "processing2", label: "processing|(other)" },
              { value: "lucy", label: "solved" },
            ]}
          />
        </div>
        <div style={{ margin: "10px 20px" }}>
          <span>timeSelectType: </span>
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={() => {}}
            options={[
              { value: "all", label: "all" },
              { value: "happen", label: "happen" },
              { value: "guard process", label: "guard process" },
              { value: "manager process", label: "manager process" },
            ]}
          />
          <DatePicker.RangePicker
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={() => {}}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <span>device:</span>
          <Select
            mode="tags"
            size={"middle"}
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            onChange={() => {}}
            style={{ width: "200px" }}
            options={[]}
          />
        </div>
      </div>

      <Table pagination={false} columns={columns} dataSource={data} bordered />
      <AlarmDetailDrawer open={open} onClose={onClose} detail={detail} />
    </div>
  );
};
export default WithAuth(Alarm);
