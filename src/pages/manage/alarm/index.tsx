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
import { AlarmDetail } from "@/models/useAlarms";

const HistoryAlarm = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dealId, setDealId] = useState<number>(-1);
  const { admin, isLogin } = useModel("useAdminInfo");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  const fetchList = (page: number, pageSize: number) => {
    setPage(page);
    const values = form.getFieldsValue();
    let params = {};
    params = {
      fiberId: values.fiberId,
      guardId: values.guardId !== "all" ? values.guardId : undefined,
      managerId: values.managerId !== "all" ? values.managerId : undefined,
      type: values.type !== "all" ? values.type : undefined,
      status: values.status !== -1 ? values.status : undefined,
      timeType: values.time
        ? values.timeType !== "all"
          ? values.timeType
          : undefined
        : undefined,
      startTime: values.time ? dayjs(values.time[0]).valueOf() : undefined,
      endTime: values.time ? dayjs(values.time[1]).valueOf() : undefined,
    };

    setLoading(true);
    getAlarmList(params, page, pageSize).then((res) => {
      setLoading(false);
      const { totalPage, data } = res;
      setTotal(totalPage);
      setData(data);
    });
  };
  const deleteAlarm = async (id: number) => {
    console.log(id);
    await delAlarmDetail(id);
    message.success("success");
    fetchList(1, 6);
  };
  const statusMap = ["pending", "processing", "solved"];
  const colorMap = ["default", "processing", "success"];
  const typeMap = ["intrusion", "tamper", "wire Disconnect", "Disconnect"];
  const onClose = () => setOpen(false);

  const [fiberOptions, setFiberOp] = useState();
  const [guardOptions, setGuardOp] = useState([]);
  const [managerOptions, setManagerOp] = useState([]);
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
      width: 150,
      render: (_, record) => (
        <Tag color={colorMap[record.status]}>{statusMap[record.status]}</Tag>
      ),
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
            {admin?.type === 0 && record.status === 2 && (
              <Popconfirm
                title="delete the alarm"
                description="Are you sure to delete the alarm?"
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
    const { data: allFiber } = await getFiber("", false);
    const { data: allGuard } = await getGuard(false);
    const { data: allManager } = await getUser(2, "", false);
    if (!allFiber || !allGuard || !allManager) return;
    const f = allFiber.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    const g = allGuard.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    const m = allManager.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setFiberOp(f);
    setGuardOp(g);
    setManagerOp(m);
  };
  useEffect(() => {
    if (!isLogin) return;
    fetchFormValue();
    fetchList(page, pageSize);
  }, [isLogin]);

  const handleSearch = () => {
    // setLoading(true);
    fetchList(1, 6);
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
          type: "all",
          guardId: "all",
          managerId: "all",
        }}
      >
        <Row gutter={24} style={{ height: 45 }}>
          <Col>
            <Form.Item name={`fiberId`} label={`fiber`}>
              <Select
                optionFilterProp="label"
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
            <Form.Item name={`type`} label={`type`}>
              <Select
                // mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "230px" }}
                maxTagCount={1}
                options={[
                  { value: "all", label: "all" },
                  { value: 0, label: "intrusion" },
                  { value: 1, label: "tamper" },
                  { value: 2, label: "wire Disconnect" },
                  { value: 3, label: "Disconnect" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`managerId`} label={`manager`}>
              <Select
                // mode="multiple"
                size={"middle"}
                placeholder="Please select"
                showSearch
                optionFilterProp="label"
                style={{ width: "230px" }}
                maxTagCount={1}
                options={[{ value: "all", label: "all" }, ...managerOptions]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name={`guardId`} label={`guard`}>
              <Select
                // mode="multiple"
                size={"middle"}
                showSearch
                optionFilterProp="label"
                placeholder="Please select"
                style={{ width: "230px" }}
                maxTagCount={1}
                options={[{ value: "all", label: "all" }, ...guardOptions]}
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
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 6,
          current: page,
          pageSize,
          total: total * pageSize,
          onChange: (page, pageSize) => {
            fetchList(page, pageSize);
          },
          showSizeChanger: false,
        }}
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
