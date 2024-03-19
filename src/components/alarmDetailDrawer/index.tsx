import { Button, Col, Drawer, Row, Tag, message } from "antd";
import styles from "./index.less";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAlarmDetail } from "@/services/admin";
import { AlarmDetail } from "@/models/useAlarms";
import dayjs from "@/utills/day";
import { useModel } from "umi";
import TextArea from "./textArea";
import { TextAreaRef } from "antd/lib/input/TextArea";
import Zmage from "react-zmage";
import "react-zmage/lib/zmage.css";
import MapModal from "../mapModal";
interface IProps {
  open: boolean;
  onClose: () => void;
  alarmID: number;
  isHistory?: boolean;
  flush?: () => void;
}
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
          <Col span={7}>
            <div className={styles["info-label"]}>{label}:</div>
          </Col>
          <Col span={14}>
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

export default (props: IProps) => {
  const { open, onClose, alarmID, isHistory, flush } = props;
  const [detail, setDetail] = useState<AlarmDetail>();
  const { handleManage, messageLoading } = useModel("useAlarms");
  const processInfo = useRef<TextAreaRef>();
  const {
    Intrusion,
    Tamper,
    BrokenFiber,
    Disconnect,
    Zone,
    Guarder,
    Officer,
    AlarmType,
    Pending,
    Processing,
    Solved,
    Success,
    AlarmDetail,
    Location,
    CheckMap,
    AlarmTime,
    Status,
    CameraNo,
    Submit,
    Time,
    PleaseInput,
    AlarmReason,
    HumanIntrusion,
    SignalDisconnect,
    AnimalIntrusion,
    BadWeather,
    Log,
  } = useModel("useLocaleText");
  const typeMap = [Intrusion, Tamper, BrokenFiber, Disconnect];
  const alarmReasonMap = [
    HumanIntrusion,
    SignalDisconnect,
    AnimalIntrusion,
    BadWeather,
  ];
  const [mapModal, setMapModal] = useState({
    id: -1,
    type: "",
    isModalOpen: false,
  });
  useEffect(() => {
    if (alarmID === -1) return;
    getAlarmDetail(alarmID).then((res) => {
      setDetail(res.data);
    });
  }, [alarmID]);

  const renderStatus = (status: number) => {
    const statusMap = [Pending, Processing, Solved];
    const colorMap = ["default", "processing", "success"];
    if (status === -1) return <div>not found</div>;
    return <Tag color={colorMap[status]}>{statusMap[status]}</Tag>;
  };
  const handleSubmit = (id: number) => {
    if (!processInfo.current) return;
    const log = processInfo.current.resizableTextArea?.textArea.value;
    if (!log) {
      message.info(PleaseInput);
      return;
    }
    handleManage(id, log);
    message.success(Success);
    if (flush) flush();
    onClose();
  };
  const modalClose = () => {
    setMapModal({
      id: -1,
      type: "",
      isModalOpen: false,
    });
  };
  return (
    <Drawer
      destroyOnClose
      title={AlarmDetail}
      onClose={() => {
        onClose();
      }}
      open={open}
      width={580}
    >
      <div>
        <DescriptionText label="ID" content={detail?.id.toString()} />
        <DescriptionText label={Zone} content={detail?.fiber.name} />
        <DescriptionText
          label={AlarmType}
          content={
            typeof detail?.type === "number" ? typeMap[detail?.type] : ""
          }
        />
        <DescriptionText
          label={Location}
          Other={useCallback(
            () => (
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setMapModal({
                    id: detail!.fiber.id,
                    type: "fiber",
                    isModalOpen: true,
                  });
                }}
              >
                <span style={{ fontSize: 12, color: "#fff" }}>{CheckMap}</span>
              </Button>
            ),
            [detail]
          )}
        />
        <DescriptionText
          label={AlarmTime}
          content={dayjs(detail?.createTime).format("MMMM D, YYYY h:mm A")}
        />

        <DescriptionText
          label={Status}
          Other={useCallback(
            () =>
              renderStatus(
                typeof detail?.status === "undefined" ? -1 : detail?.status
              ),
            [detail]
          )}
        />

        <DescriptionText
          label={CameraNo}
          Other={useCallback(
            () => (
              <div className={styles["camera-scroll"]}>
                {detail?.snapshots.map((item) => {
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
            [detail]
          )}
        />
        <DescriptionText
          label={AlarmReason}
          content={detail?.guard ? alarmReasonMap[detail?.guard.reason] : ""}
        />
        <DescriptionText label={Guarder} content={detail?.guard?.name} />
        <DescriptionText
          label={`${Guarder} ${Log}`}
          content={detail?.guard?.log}
        />
        <DescriptionText
          label={`${Guarder} ${Log}${Time}`}
          content={
            detail?.guard?.time
              ? dayjs(detail?.guard?.time).format("MMMM D, YYYY h:mm A")
              : ""
          }
        />
        <DescriptionText label={Officer} content={detail?.manager?.name} />
        <DescriptionText
          label={`${Officer} ${Log}`}
          Other={useCallback(
            () => (
              <TextArea
                status={detail?.status || -1}
                info={detail?.manager?.log || ""}
                isHistory={isHistory || false}
                ref={processInfo}
              />
            ),
            [detail]
          )}
        />
        {isHistory && (
          <DescriptionText
            label={`${Officer} ${Log}${Time}`}
            content={
              detail?.manager?.time
                ? dayjs(detail?.manager.time).format("MMMM D, YYYY h:mm A")
                : ""
            }
          />
        )}
        {!isHistory && (
          <div className={styles["button-container"]}>
            {detail?.status === 1 && (
              <Button
                onClick={() => handleSubmit(detail?.id)}
                loading={messageLoading}
              >
                {Submit}
              </Button>
            )}
          </div>
        )}
      </div>
      <MapModal
        id={mapModal.id}
        isModalOpen={mapModal.isModalOpen}
        type={mapModal.type}
        onClose={modalClose}
      />
    </Drawer>
  );
};
