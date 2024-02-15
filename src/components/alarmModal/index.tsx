import {
  ConfigProvider,
  Modal,
  Tabs,
  Input,
  Button,
  Row,
  Col,
  Popover,
  message,
} from "antd";
import { useModel } from "umi";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { getAlarmDetail } from "@/services/monitor";
import { Alarm, AlarmDetail } from "@/models/useAlarms";
import dayjs from "@/utills/day";
import trumpetOn from "@/assets/trumpet/trumpet_on_b.png";
import trumpetOff from "@/assets/trumpet/trumpet_off_b.png";
import SoundAlert from "../alarmAudio";
import Zmage from "react-zmage";
import "react-zmage/lib/zmage.css";
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
  const { alarmList, handleGuard } = useModel("useAlarms");
  const { monitor } = useModel("useUserInfo");
  const { centerTo } = useModel("useItems");
  const [alarmDetail, setDetail] = useState<AlarmDetail>();
  const [processInfo, setProcess] = useState("");
  const { id } = props;
  const typeMap = ["intrusion", "tamper", "wire Disconnect", "Disconnect"];

  const onSubmit = async () => {
    handleGuard(id, processInfo);
    setProcess("");
    message.success("success");
  };
  useEffect(() => {
    setTarget("alarm-map-container");

    getAlarmDetail(id).then((res: any) => {
      if (!res.data) return;
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
            content={
              typeof alarmDetail?.type === "number"
                ? typeMap[alarmDetail?.type]
                : ""
            }
          />
          <DescriptionText
            label="Camera Info"
            Other={() => (
              <div className={styles["camera-scroll"]}>
                {alarmDetail?.snapshots.map((item) => {
                  return (
                    <div key={item.id}>
                      <div>{item.camera.name}</div>
                      <div className={styles["Zmage"]}>
                        <Zmage src={item.picUrl} />
                      </div>
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
            value={processInfo}
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
  const open = alarmList?.length !== 0;
  const [isTrumpetOn, setTrumpetOn] = useState(true);
  useEffect(() => {
    if (open) {
      setTrumpetOn(true);
    } else {
      setTrumpetOn(false);
    }
  }, [open]);
  return (
    <>
      <Modal
        closable={false}
        style={{ top: 20 }}
        title={null}
        footer={null}
        keyboard={false}
        maskClosable={false}
        open={open}
        width={1100}
      >
        <SoundAlert alert={isTrumpetOn} />
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
            items={alarmList.map((item: Alarm, i: number) => {
              const id = String(i + 1);
              return {
                label: `alarm ${id}`,
                key: id,
                children: <TabContent id={item.id} />,
              };
            })}
            tabBarExtraContent={{
              left: isTrumpetOn ? (
                <Popover
                  placement="right"
                  content={
                    <Button
                      onClick={() => {
                        setTrumpetOn(false);
                      }}
                    >
                      click to close
                    </Button>
                  }
                >
                  <div className={styles["trumpet"]}>
                    <img src={trumpetOn} />
                  </div>
                </Popover>
              ) : (
                <Popover placement="right">
                  <div className={styles["trumpet"]}>
                    <img src={trumpetOff} />
                  </div>
                </Popover>
              ),
            }}
          />
        </ConfigProvider>
      </Modal>
    </>
  );
}
