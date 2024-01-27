import { ConfigProvider, Modal, Tabs, Input, Button, Row, Col } from "antd";
import { useModel } from "umi";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { getAlarmDetail } from "@/services/monitor";
import { AlarmDetail } from "@/models/useAlarms";
import dayjs from "dayjs";
const DescriptionText = ({
  label,
  content,
  Other,
}: {
  label: string;
  content?: string;
  Other?: () => JSX.Element;
}) => {
  return (
    <div>
      <Row
        className={styles["info-row"]}
        style={{ width: "100%", flexDirection: "row" }}
      >
        <Col span={6}>
          <div className={styles["info-label"]}>{label}:</div>
        </Col>
        <Col span={12}>
          {Other ? (
            <Other />
          ) : (
            <div className={styles["info-content"]}>{content}</div>
          )}
        </Col>
      </Row>
    </div>
  );
};
const TabContent = (props: { id: number }) => {
  const { setTarget } = useModel("useMap");
  const { alarmList } = useModel("useAlarms");
  const { monitor } = useModel("useUserInfo");
  const { centerTo } = useModel("useItems");
  const [alarmDetail, setDetail] = useState<AlarmDetail>();
  const [ProcessInfo, setProcess] = useState("");
  const { id } = props;
  const onSubmit = () => {
    // TODO: 触发提交处理事件
  };
  useEffect(() => {
    setTarget("alarm-map-container");

    getAlarmDetail(id).then((res) => {
      console.log(res);

      setDetail(res.data);
      centerTo(res.data.fiber.id, "fiber");
    });

    return function () {
      const dom = document.getElementById("alarm-map-container");
      setTarget("");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, [alarmList.length]);
  return (
    <div className={styles["tab-content"]}>
      <div className={styles["tab-list"]}>
        <span style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
          Alarm Info
        </span>
        <div className={styles["tab-info"]}>
          <DescriptionText
            label="Alarm Time"
            content={dayjs(alarmDetail?.createTime).format(
              "MMMM D, YYYY h:mm A"
            )}
          />
          <DescriptionText
            label="Fiber Name"
            content={alarmDetail?.fiber.name}
          />
          <DescriptionText
            label="Alarm Type"
            content={alarmDetail?.description}
          />
          <DescriptionText
            label="Camera Info"
            Other={() => (
              <div className={styles["camera-scroll"]}>
                {alarmDetail?.snapshots.map((item) => {
                  return (
                    <div key={item.id}>
                      <div>{item.camera.name}</div>
                      <img style={{ width: 200 }} src={item.picUrl} />
                    </div>
                  );
                })}
              </div>
            )}
          />
        </div>
        <DescriptionText label="Manager" content={monitor?.name} />
        <div className={styles["tab-sub"]}>
          <Input.TextArea
            showCount
            maxLength={200}
            value={ProcessInfo}
            onChange={(e) => setProcess(e.target.value)}
            placeholder="input info"
            style={{ height: 100, resize: "none" }}
          />
          <Button style={{ marginTop: 20 }} onClick={onSubmit}>
            submit
          </Button>
        </div>
      </div>
      <div className={styles["tab-map"]}>
        <div
          id="alarm-map-container"
          className={styles["alarm-map-container"]}
        ></div>
      </div>
    </div>
  );
};
export default function () {
  const { alarmList } = useModel("useAlarms");
  const isModalOpen = !(alarmList.length === 0);
  return (
    <>
      <Modal
        closable={false}
        style={{ top: 20 }}
        title={null}
        footer={null}
        keyboard={false}
        maskClosable={false}
        open={isModalOpen}
        width={1100}
      >
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
            },
          }}
        >
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
            centered
            items={alarmList.map((item, i) => {
              const id = String(i + 1);
              return {
                label: `alarm ${id}`,
                key: id,
                children: <TabContent id={item.id} />,
              };
            })}
          />
        </ConfigProvider>
      </Modal>
    </>
  );
}
