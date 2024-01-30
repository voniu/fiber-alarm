import { getAlarmList, getFiber, getGuard, getUser } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { DatePicker, Form, Select, Table, Tag, Row, Col, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./index.less";
import AlarmDetailDrawer from "@/components/alarmDetailDrawer";
import locale from "antd/es/date-picker/locale/en_GB";
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

const HistoryAlarm = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dealId, setDealId] = useState<number>(-1);

  const statusMap = ["pending", "processing", "solved"];
  const colorMap = ["default", "processing", "success"];

  const onClose = () => setOpen(false);

  const [form] = Form.useForm();
  const [fiberOptions, setFiberOp] = useState();
  const [guardOptions, setGuardOp] = useState();
  const [managerOptions, setManagerOp] = useState();
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
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Tag color={colorMap[record.status]}>{statusMap[record.status]}</Tag>
      ),
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
      title: "Operator",
      render: (_, record) => {
        return (
          <a
            style={{ color: "blue" }}
            onClick={() => {
              setOpen(true);
              setDealId(record.id);
            }}
          >
            {"Detail"}
          </a>
        );
      },
    },
  ];

  const fetchFormValue = async () => {
    const { data: allFiber } = await getFiber("");
    const f = allFiber.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    const { data: allGuard } = await getGuard();
    const g = allGuard.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    const { data: allManager } = await getUser(1, "");
    const m = allManager.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setFiberOp(f);
    setGuardOp(g);
    setManagerOp(m);
    console.log(allFiber, allManager, allGuard);
  };
  useEffect(() => {
    fetchFormValue();
    setLoading(true);
    getAlarmList({}).then((res) => {
      console.log(res);
      setLoading(false);
      const { data } = res;
      setData(data);
    });
  }, []);

  const handleSearch = (values: any) => {
    // setLoading(true);
    console.log(values);
  };
  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>AlarmList</p>
      <Form
        form={form}
        name="advanced_search"
        onFinish={handleSearch}
        labelAlign="right"
      >
        <Row gutter={24}>
          <Col>
            <Form.Item name={`fiber`} label={`fiber`}>
              <Select
                mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "230px" }}
                options={fiberOptions}
                maxTagCount={1}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`status`} label={`status`}>
              <Select
                style={{ width: 150 }}
                options={[
                  { value: "all", label: "all" },
                  { value: "happen", label: "happen" },
                  { value: "guard process", label: "guard process" },
                  { value: "manager process", label: "manager process" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`timeType`} label={`timeType`}>
              <Select
                style={{ width: 100 }}
                options={[
                  { value: "all", label: "all" },
                  { value: "CREATE", label: "CREATE" },
                  { value: "GUARD", label: "GUARD" },
                  { value: "MANAGER", label: "MANAGER" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`time`} label={``}>
              <DatePicker.RangePicker
                locale={locale}
                style={{ width: 350 }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
            <Form.Item name={`manager`} label={`manager`}>
              <Select
                mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "230px" }}
                maxTagCount={1}
                options={managerOptions}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`guard`} label={`guard`}>
              <Select
                mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "230px" }}
                maxTagCount={1}
                options={guardOptions}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" loading={loading} htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        loading={loading}
        rowKey={"id"}
        pagination={{ pageSize: 6 }}
        columns={columns}
        dataSource={data}
        bordered
      />
      <AlarmDetailDrawer
        open={open}
        onClose={onClose}
        alarmID={dealId}
        isHistory
      />
    </div>
  );
};
export default WithAuth(HistoryAlarm);
