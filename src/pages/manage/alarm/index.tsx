import {
  delAlarmDetail,
  getAlarmList,
  getFiber,
  getGuard,
  getUser,
} from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import {
  DatePicker,
  Form,
  Select,
  Table,
  Tag,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./index.less";
import AlarmDetailDrawer from "@/components/alarmDetailDrawer";
import locale from "antd/es/date-picker/locale/en_GB";
import dayjs from "@/utills/day";
import { useModel } from "umi";
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
  const { admin } = useModel("useAdminInfo");
  const fetchList = (values?: any) => {
    let params = {
      fiberId: undefined,
      guardId: undefined,
      managerId: undefined,
      status: undefined,
      time: undefined,
      timeType: undefined,
    };
    if (values)
      params = {
        ...values,
        status: values.status !== -1 ? values.status : undefined,
        timeType: values.timeType !== "all" ? values.timeType : undefined,
        startTime: values.time ? dayjs(values.time[0]).valueOf() : undefined,
        endTime: values.time ? dayjs(values.time[1]).valueOf() : undefined,
      };
    console.log(params);

    setLoading(true);
    getAlarmList(params).then((res) => {
      console.log(res);
      setLoading(false);
      const { data } = res;
      setData(data);
    });
  };
  const deleteAlarm = async (id: number) => {
    console.log(id);
    await delAlarmDetail(id);
    message.success("success");
    fetchList();
  };
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
          <>
            <a
              style={{ color: "blue", marginRight: 10 }}
              onClick={() => {
                setOpen(true);
                setDealId(record.id);
              }}
            >
              {"Detail"}
            </a>
            {admin?.type === 0 && (
              <Popconfirm
                title="reset the password"
                description="Are you sure to reset the password?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteAlarm(record.id)}
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            )}
          </>
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
    fetchList();
  }, []);

  const handleSearch = (values: any) => {
    // setLoading(true);
    console.log(values);
    fetchList(values);
  };
  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>AlarmList</p>
      <Form
        form={form}
        name="advanced_search"
        onFinish={handleSearch}
        labelAlign="right"
        initialValues={{
          status: -1,
          timeType: "all",
        }}
      >
        <Row gutter={24}>
          <Col>
            <Form.Item name={`fiberId`} label={`fiber`}>
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
                  { value: -1, label: "all" },
                  { value: 0, label: "happen" },
                  { value: 1, label: "guard processed" },
                  { value: 2, label: "manager processed" },
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
            <Form.Item name={`managerId`} label={`manager`}>
              <Select
                // mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "230px" }}
                maxTagCount={1}
                options={managerOptions}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`guardId`} label={`guard`}>
              <Select
                // mode="multiple"
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
        dataSource={data || []}
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
