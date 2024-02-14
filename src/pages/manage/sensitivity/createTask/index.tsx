import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Tabs,
  TimePicker,
  message,
} from "antd";
import { addTask, getFiber, getTaskDetail } from "@/services/admin";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "@/utills/day";
import locale from "antd/es/date-picker/locale/en_GB";

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
  const [fiberOptions, setFiberOp] = useState<
    {
      label: string;
      value: string;
    }[]
  >();
  const [configType, setConfigType] = useState({
    "0": false,
    "1": false,
  });
  const [loading, setLoading] = useState(false);

  const levelOptions = (count: number) => {
    const op = [];
    for (let i = 1; i <= count; i++) {
      op.push({ value: i, label: i });
    }
    return op;
  };
  const getFiberOptions = async () => {
    const { data: allFiber } = await getFiber("", false);
    const f = allFiber.map((item: any) => {
      return {
        value: item.id,
        type: item.device.type,
        label: item.name,
      };
    });
    setFiberOp(f);
  };
  const onFiberChange = (val: any, option: any) => {
    console.log(val, option);
    let res = { "0": false, "1": false };
    option.forEach((item: any) => {
      if (item.type === 0) res = { ...res, "0": true };
      if (item.type === 1) res = { ...res, "1": true };
    });
    setConfigType(res);
  };
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
    await addTask(name, { hour: time.hour(), minute: time.minute() }, fibers, {
      "0": { vibeCount, vibeAmplitude, vibeWidth, vibeGap },
      "1": {
        alarmSensitivity,
        systemSensitivity,
        groupWidth,
        groupGap,
        groupEntity,
      },
    });
    setLoading(false);
    message.success("success");
    onCancel();
    fetchTask();
  };
  const getTaskForm = async (id: number) => {
    const { data } = await getTaskDetail(id);
    const { name, hour, minute, affectFibers, configMap } = data;
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
  useEffect(() => {
    if (!isModalOpen) return;
    getFiberOptions();
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
        width={600}
        onCancel={onCancel}
      >
        <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>{`${
          check.type
        } Task ${check.type === "Check" ? "(For viewing only)" : ""}`}</p>
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
          <Form form={form} onFinish={onFinish} labelAlign="right">
            <Form.Item
              label={"Name"}
              name={"name"}
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item
              label={"Fibers"}
              name={"fibers"}
              rules={[{ required: true, message: "Please select the fiber!" }]}
            >
              <Select
                maxTagCount={1}
                mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "200px" }}
                onChange={onFiberChange}
                optionLabelProp="label"
                optionFilterProp="label"
                options={fiberOptions}
              />
            </Form.Item>
            <Form.Item
              label={"Time"}
              name={"time"}
              rules={[{ required: true, message: "Please set the time!" }]}
            >
              <TimePicker locale={locale} minuteStep={30} format={"HH:mm"} />
            </Form.Item>
            {
              <Form.Item label={"config"} name={"config"}>
                <Tabs
                  type="card"
                  size={"middle"}
                  defaultActiveKey={configType["0"] ? "1" : "2"}
                >
                  {configType["0"] && (
                    <Tabs.TabPane tab="config-a" key={"1"} forceRender>
                      <Form.Item
                        label={"vibeCount"}
                        name={"vibeCount"}
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"vibeAmplitude"}
                        name={"vibeAmplitude"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"vibeWidth"}
                        name={"vibeWidth"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"vibeGap"}
                        name={"vibeGap"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(99)}
                        />
                      </Form.Item>
                    </Tabs.TabPane>
                  )}
                  {configType["1"] && (
                    <Tabs.TabPane forceRender tab="config-b" key={"2"}>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"alarmSensitivity"}
                        name={"alarmSensitivity"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"systemSensitivity"}
                        name={"systemSensitivity"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(10)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"groupWidth"}
                        name={"groupWidth"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"groupGap"}
                        name={"groupGap"}
                      >
                        <Select
                          style={{ width: 100 }}
                          options={levelOptions(50)}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip={{
                          title: "Optional",
                          icon: <InfoCircleOutlined />,
                        }}
                        label={"groupEntity"}
                        name={"groupEntity"}
                      >
                        <Select
                          style={{ width: 100 }}
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
                  submit
                </Button>
              </Form.Item>
            )}
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  );
};
