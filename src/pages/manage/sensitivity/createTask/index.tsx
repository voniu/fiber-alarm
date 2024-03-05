import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Tabs,
  TimePicker,
  Typography,
  message,
} from "antd";
import { addTask, getTaskDetail } from "@/services/admin";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "@/utills/day";
import locale from "antd/es/date-picker/locale/en_GB";
import FiberTable from "./fiberTable";
import styles from "./index.less";
import { useModel } from "umi";
interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
  fetchTask: () => void;
  check: {
    type: string;
    taskId: number | null;
  };
}
export default (props: IProps) => {
  const { isModalOpen, onCancel, fetchTask, check } = props;
  const [form] = Form.useForm();
  const {
    Success,
    Create,
    Check,
    Task,
    Name,
    Fiber,
    Time,
    Config,
    VibeCount,
    VibeAmplitude,
    VibeWidth,
    VibeGap,
    AlarmSensitivity,
    SystemSensitivity,
    GroupWidth,
    GroupGap,
    GroupEntity,
    Submit,
    Optional,
  } = useModel("useLocaleText");
  const [selectdFiber, setSelectFiber] = useState<
    {
      id: number;
      type: number;
    }[]
  >([]);
  const [configType, setConfigType] = useState({
    "0": false,
    "1": false,
  });
  const [loading, setLoading] = useState(false);
  const [fiberInfo, setFiberInfo] = useState([]);
  const levelOptions = (count: number) => {
    const op = [];
    for (let i = 1; i <= count; i++) {
      op.push({ value: i, label: i });
    }
    return op;
  };
  useEffect(() => {
    let res = { "0": false, "1": false };
    selectdFiber.forEach((item: any) => {
      if (item.type === 0) res = { ...res, "0": true };
      if (item.type === 1) res = { ...res, "1": true };
    });
    setConfigType(res);
  }, [selectdFiber]);
  const onFinish = async (value: any) => {
    setLoading(true);
    console.log(value);
    const {
      name,
      fibers,
      time,
      alarmSensitivity,
      systemSensitivity,
      groupWidth,
      groupGap,
      groupEntity,
      vibeCount,
      vibeAmplitude,
      vibeWidth,
      vibeGap,
    } = value;
    const { success, msg } = await addTask(
      name,
      { hour: time.hour(), minute: time.minute() },
      fibers,
      {
        "0": { vibeCount, vibeAmplitude, vibeWidth, vibeGap },
        "1": {
          alarmSensitivity,
          systemSensitivity,
          groupWidth,
          groupGap,
          groupEntity,
        },
      }
    );
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
    setLoading(false);
    onCancel();
    fetchTask();
  };
  const getTaskForm = async (id: number) => {
    const { success, msg, data } = await getTaskDetail(id);
    if (!success) {
      message.error(msg);
      return;
    }
    const { name, hour, minute, affectFibers, configMap } = data;
    setFiberInfo(affectFibers);
    let configA = {};
    let configB = {};
    setConfigType({ "0": !!configMap["0"], "1": !!configMap["1"] });
    if (configMap["0"]) {
      const { vibeCount, vibeAmplitude, vibeWidth, vibeGap } = configMap["0"];
      configA = {
        vibeCount,
        vibeAmplitude,
        vibeWidth,
        vibeGap,
      };
    }
    if (configMap["1"]) {
      const {
        alarmSensitivity,
        systemSensitivity,
        groupWidth,
        groupGap,
        groupEntity,
      } = configMap["1"];
      configB = {
        alarmSensitivity,
        systemSensitivity,
        groupWidth,
        groupGap,
        groupEntity,
      };
    }
    console.log(configA, configB);
    form.setFieldsValue({
      name,
      time: dayjs().hour(hour).minute(minute),
      fibers: affectFibers.map((item: any) => item.id),
      ...configA,
      ...configB,
    });
  };
  const getFibersName = (fibers: any) => {
    return fibers
      .map((item: any) => {
        return item.name;
      })
      .join("/");
  };
  useEffect(() => {
    setLoading(false);
    if (!isModalOpen) return;
    if (check.type === "Create") {
      form.resetFields();
      setConfigType({ "0": false, "1": false });
    } else {
      form.resetFields();
      getTaskForm(check.taskId!);
    }
  }, [isModalOpen]);
  return (
    <>
      <Modal
        style={{ top: 10 }}
        title={null}
        footer={null}
        keyboard={false}
        open={isModalOpen}
        width={check.type === "Check" ? 600 : 800}
        onCancel={onCancel}
      >
        <p
          style={{
            fontSize: 20,
            fontWeight: "bold",
            height: 20,
            marginBottom: 20,
          }}
        >{`${check.type === "Check" ? Check : Create} ${Task}`}</p>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
                labelColor: "#000",
                labelColonMarginInlineEnd: 15,
              },
            },
          }}
        >
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            disabled={check.type === "Check"}
          >
            <div className={styles["form-top"]}>
              <div className={styles["form-top-item-l"]}>
                <Form.Item
                  label={Name}
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <Input style={{ width: 200 }} />
                </Form.Item>

                {check.type === "Check" && (
                  <Form.Item
                    label={Fiber}
                    name={"fibers"}
                    rules={[{ required: true }]}
                  >
                    <Typography.Text
                      ellipsis={{ tooltip: true }}
                      style={{ width: 250 }}
                    >
                      {getFibersName(fiberInfo)}
                    </Typography.Text>
                  </Form.Item>
                )}
                <Form.Item
                  label={Time}
                  name={"time"}
                  rules={[{ required: true }]}
                >
                  <TimePicker
                    locale={locale}
                    minuteStep={30}
                    format={"HH:mm"}
                  />
                </Form.Item>
              </div>
              <div className={styles["form-top-item-r"]}>
                {check.type === "Create" && (
                  <Form.Item
                    label={Fiber}
                    name={"fibers"}
                    rules={[{ required: true }]}
                  >
                    <FiberTable
                      setSelectFiber={(fibers: any) => {
                        form.setFieldValue(
                          "fibers",
                          fibers.map((item: any) => item.id)
                        );
                        setSelectFiber(fibers);
                      }}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
            {
              <Form.Item label={Config} name={"config"}>
                <Tabs
                  type="card"
                  size={"middle"}
                  defaultActiveKey={configType["0"] ? "1" : "2"}
                >
                  {configType["0"] && (
                    <Tabs.TabPane
                      tab={`${Config}-a(00:00-24:00)`}
                      key={"1"}
                      forceRender
                    >
                      <Form.Item
                        label={VibeCount}
                        name={"vibeCount"}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        className={styles["config-item"]}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={VibeAmplitude}
                        name={"vibeAmplitude"}
                        className={styles["config-item"]}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        className={styles["config-item"]}
                        label={VibeWidth}
                        name={"vibeWidth"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                      <Form.Item
                        className={styles["config-item"]}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={VibeGap}
                        name={"vibeGap"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                    </Tabs.TabPane>
                  )}
                  {configType["1"] && (
                    <Tabs.TabPane forceRender tab="config-b" key={"2"}>
                      <Form.Item
                        className={styles["config-item"]}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={AlarmSensitivity}
                        name={"alarmSensitivity"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                      <Form.Item
                        className={styles["config-item"]}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={SystemSensitivity}
                        name={"systemSensitivity"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(10)}
                        />
                      </Form.Item>
                      <Form.Item
                        className={styles["config-item"]}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={GroupWidth}
                        name={"groupWidth"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                      <Form.Item
                        className={styles["config-item"]}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={GroupGap}
                        name={"groupGap"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                      <Form.Item
                        className={styles["config-item"]}
                        tooltip={{
                          title: Optional,
                          icon: <InfoCircleOutlined />,
                        }}
                        label={GroupEntity}
                        name={"groupEntity"}
                      >
                        <Select
                          style={{ width: 100, height: 25 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                    </Tabs.TabPane>
                  )}
                </Tabs>
              </Form.Item>
            }
            {check.type === "Create" && (
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {Submit}
                </Button>
              </Form.Item>
            )}
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  );
};
