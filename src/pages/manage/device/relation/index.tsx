import { Button, Col, Modal, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import { getCamera, getFiberDetail, setFiberCamera } from "@/services/admin";
import styles from "./index.less";
import { Camera } from "@/models/useItems";
import { useModel } from "umi";
interface IProps {
  fiber: { id: number; name: string };
  isModalOpen: boolean;
  setRelation: (isModalOpen: boolean, fiber: IProps["fiber"]) => void;
  flush: () => void;
}
export default function (props: IProps) {
  const { fiber, isModalOpen, setRelation, flush } = props;
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(false);

  const {
    AddAssociatedCamera,
    ZoneName,
    Cameras,
    Submit,
    Success,
    PleaseSelect,
  } = useModel("useLocaleText");

  const handleChange = (value: string[]) => {
    console.log(value);
    setValue(value);
  };
  const fetchData = async () => {
    setLoading(true);
    const { data: allCamera } = await getCamera("", false);
    const { data: fiberDetail } = await getFiberDetail(fiber.id);
    const defaultCamera = fiberDetail?.triggerCameras.map((item: Camera) => {
      return item.id;
    });
    const options = allCamera.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
        disabled: defaultCamera.includes(item.id),
      };
    });

    setOptions(options);
    setLoading(false);
  };
  const handleSubmit = async () => {
    if (value.length === 0) {
      message.info(PleaseSelect);
      return;
    }

    value.forEach((item) => {
      setFiberCamera(fiber.id, Number(item));
    });
    message.success(Success);
    setRelation(false, { id: -1, name: "" });
    flush();
  };
  useEffect(() => {
    if (isModalOpen) fetchData();
  }, [fiber]);
  return (
    <>
      <Modal
        style={{ top: 120 }}
        title={null}
        footer={null}
        keyboard={false}
        open={isModalOpen}
        width={500}
        onCancel={() => {
          setRelation(false, { id: -1, name: "" });
          setValue([]);
        }}
      >
        <div className={styles["title"]}>{AddAssociatedCamera}</div>
        <div className={styles["content"]}>
          <Row justify={"center"} style={{ margin: "10px 0" }}>
            <Col span={4}>
              <span className={styles["label"]}>{ZoneName}:</span>
            </Col>
            <Col span={6}>
              <span className={styles["label"]}>{fiber.name}</span>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={4}>
              <span className={styles["label"]}>{Cameras}:</span>
            </Col>
            <Col span={12}>
              <Select
                loading={loading}
                mode="multiple"
                optionFilterProp="label"
                placeholder={PleaseSelect}
                defaultValue={[]}
                value={value}
                onChange={handleChange}
                style={{ width: "100%" }}
                maxTagCount={1}
                options={options}
              />
            </Col>
          </Row>
        </div>
        <div className={styles["submit"]}>
          <Button type="primary" onClick={handleSubmit}>
            {Submit}
          </Button>
        </div>
      </Modal>
    </>
  );
}
