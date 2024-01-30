import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import { addTask, getFiber } from "@/services/admin";
import { useEffect, useMemo, useState } from "react";

interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
  fetchTask: () => void;
}
export default (props: IProps) => {
  const { isModalOpen, onCancel, fetchTask } = props;
  const [form] = Form.useForm();
  const [fiberOptions, setFiberOp] = useState();
  const levelMax = 20;
  const levelOptions = useMemo(() => {
    const op = [];
    for (let i = 1; i <= levelMax; i++) {
      op.push({ value: i, label: i });
    }
    return op;
  }, []);
  const getFiberOptions = async () => {
    const { data: allFiber } = await getFiber("");
    const f = allFiber.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setFiberOp(f);
  };
  const onFinish = async (value: any) => {
    console.log(value, value.time.minute());
    const { fibers, time, level } = value;
    await addTask({ hour: time.hour(), minute: time.minute() }, fibers, level);
    message.success("success");
    onCancel();
    fetchTask();
  };
  useEffect(() => {
    if (!isModalOpen) return;
    getFiberOptions();
  }, [isModalOpen]);
  return (
    <>
      <Modal
        style={{ top: 120 }}
        title={null}
        footer={null}
        keyboard={false}
        open={isModalOpen}
        width={500}
        onCancel={onCancel}
      >
        <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>Add Task</p>
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
            <Form.Item label={"Fibers"} name={"fibers"}>
              <Select
                maxTagCount={1}
                mode="multiple"
                size={"middle"}
                placeholder="Please select"
                style={{ width: "200px" }}
                options={fiberOptions}
              />
            </Form.Item>
            <Form.Item label={"Time"} name={"time"}>
              <TimePicker minuteStep={30} format={"HH:mm"} />
            </Form.Item>
            <Form.Item label={"Level"} name={"level"}>
              <Select style={{ width: 120 }} options={levelOptions} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  );
};
