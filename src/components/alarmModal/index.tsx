import {
  ConfigProvider,
  Modal,
  Tabs,
  Button,
  Row,
  Col,
  Popover,
  message,
  Select,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useModel, FormattedMessage } from "umi";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.less";
import { getAlarmDetail } from "@/services/monitor";
import { Alarm, AlarmDetail } from "@/models/useAlarms";
import dayjs from "@/utills/day";
import trumpetOn from "@/assets/trumpet/trumpet_on_b.png";
// import trumpetOff from "@/assets/trumpet/trumpet_off_b.png";
import SoundAlert from "../alarmAudio";
import Zmage from "react-zmage";
import "react-zmage/lib/zmage.css";
import { TextAreaRef } from "antd/lib/input/TextArea";
import TextArea from "./textArea";
import React from "react";
import converter from "number-to-words";
const DescriptionText = React.memo(
  ({
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
  }
);
const TabContent = (props: { id: number }) => {
  const { setTarget } = useModel("useMap");
  const { alarmList, handleGuard } = useModel("useAlarms");
  const { monitor } = useModel("useUserInfo");
  const { centerTo } = useModel("useItems");
  const [alarmDetail, setDetail] = useState<AlarmDetail>();
  const {
    AlarmReason,
    AlarmTime,
    ZoneNo,
    AlarmType,
    CameraNo,
    Officer,
    Intrusion,
    Tamper,
    WireDisconnect,
    Disconnect,
    Success,
    HumanIntrusion,
    SignalDisconnect,
    AnimalIntrusion,
    BadWeather,
    Required,
    PleaseSelect,
  } = useModel("useLocaleText");

  const { id } = props;
  const typeMap = [Intrusion, Tamper, WireDisconnect, Disconnect];
  const processInfo = useRef<TextAreaRef>();
  const [alarmReason, setAlarmReason] = useState<number>();
  const [alarmLog, setAlarmLog] = useState<string>("");

  const onChange = (value: any) => {
    setAlarmReason(value);
  };

  const onSubmit = async () => {
    let log;
    if (alarmReason === undefined) {
      message.info(PleaseSelect);
      return;
    }
    if (processInfo.current)
      log = processInfo.current.resizableTextArea?.textArea.value;
    if (!log) log = "";
    handleGuard(id, alarmReason, log);
    message.success(Success);
    setAlarmReason(undefined);
    setAlarmLog("");
  };
  useEffect(() => {
    if (alarmList.length > 0) {
      setTarget("alarm-map-container");

      getAlarmDetail(id).then((res: any) => {
        if (!res.data) return;
        setDetail(res.data);
        centerTo(res.data.fiber.id, "fiber");
      });
    } else {
      setTarget("map-container");
    }
    return function () {
      const dom = document.getElementById("alarm-map-container");
      setTarget("map-container");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, [alarmList.length]);
  return (
    <div className={styles["tab-content"]}>
      <div className={styles["tab-list"]}>
        <span style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
          <FormattedMessage id={"Alarm Info"} />
        </span>
        <div className={styles["tab-info"]}>
          <DescriptionText
            label={AlarmTime}
            content={dayjs(alarmDetail?.createTime).format(
              "MMMM D, YYYY h:mm A"
            )}
          />
          <DescriptionText label={ZoneNo} content={alarmDetail?.fiber.name} />
          <DescriptionText
            label={AlarmType}
            content={
              typeof alarmDetail?.type === "number"
                ? typeMap[alarmDetail?.type]
                : ""
            }
          />
          <DescriptionText
            label={CameraNo}
            Other={useCallback(
              () => (
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
              ),
              [alarmDetail]
            )}
          />
        </div>
        <DescriptionText label={Officer} content={monitor?.name} />
        <DescriptionText
          label={AlarmReason}
          Other={() => {
            return (
              <>
                <Select
                  style={{ width: 150 }}
                  size="small"
                  options={[
                    { label: HumanIntrusion, value: 0 },
                    { label: SignalDisconnect, value: 1 },
                    { label: AnimalIntrusion, value: 2 },
                    { label: BadWeather, value: 3 },
                  ]}
                  value={alarmReason}
                  onChange={onChange}
                />
                <Tooltip title={Required} key={"required"}>
                  <span style={{ marginLeft: 10 }}>
                    <QuestionCircleOutlined />
                  </span>
                </Tooltip>
              </>
            );
          }}
        />
        <div className={styles["tab-sub"]}>
          <TextArea
            ref={processInfo}
            value={alarmLog}
            setValue={(val) => setAlarmLog(val)}
          />
          <Button style={{ marginTop: 20 }} onClick={onSubmit}>
            <FormattedMessage id={"submit & close"} />
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
  const [isTrumpetOn, setTrumpetOn] = useState(false);
  const [volume, setVolume] = useState(0.9);
  useEffect(() => {
    if (open) {
      setTrumpetOn(true);
    } else {
      setTrumpetOn(false);
      setVolume(0.9);
    }
  }, [open]);
  return (
    <>
      <Modal
        destroyOnClose
        closable={false}
        style={{ top: 20 }}
        title={null}
        footer={null}
        keyboard={false}
        maskClosable={false}
        open={open}
        width={1100}
      >
        <SoundAlert alert={isTrumpetOn} volume={volume} />
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
                label: `${converter.toWordsOrdinal(id)}`,
                key: id,
                children: <TabContent id={item.id} />,
              };
            })}
            tabBarExtraContent={{
              left: (
                <Popover
                  placement="right"
                  content={
                    <Button
                      onClick={() => {
                        setVolume(0.1);
                      }}
                    >
                      <FormattedMessage id={"click to lower"} />
                    </Button>
                  }
                >
                  <div className={styles["trumpet"]}>
                    <img src={trumpetOn} />
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
