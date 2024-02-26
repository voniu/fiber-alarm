import { Button, Col, Drawer, Row, Tag, message } from "antd";
import styles from "./index.less";
import { useEffect, useRef, useState } from "react";
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
};

export default (props: IProps) => {
  const { open, onClose, alarmID, isHistory, flush } = props;
  const [detail, setDetail] = useState<AlarmDetail>();
  const { handleManage, messageLoading } = useModel("useAlarms");
  const processInfo = useRef<TextAreaRef>();
  const typeMap = ["intrusion", "tamper", "wire Disconnect", "Disconnect"];

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
    const statusMap = ["gözləyir", "emal olunur", "həll olundu"];
    const colorMap = ["default", "processing", "success"];
    if (status === -1) return <div>not found</div>;
    return <Tag color={colorMap[status]}>{statusMap[status]}</Tag>;
  };
  const handleSubmit = (id: number) => {
    if (!processInfo.current) return;
    const log = processInfo.current.resizableTextArea?.textArea.value;
    if (!log) {
      message.info("log daxil edin");
      return;
    }
    handleManage(id, log);
    message.success("gözləyir");
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
      title="Siqnal təfərrüatı"
      onClose={() => {
        onClose();
      }}
      open={open}
      width={500}
    >
      <div>
        <DescriptionText label="ID" content={detail?.id.toString()} />
        <DescriptionText label="Fiber Adı" content={detail?.fiber.name} />
        <DescriptionText
          label="növ"
          content={
            typeof detail?.type === "number" ? typeMap[detail?.type] : ""
          }
        />
        <DescriptionText
          label="yer"
          Other={() => (
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
              <span style={{ fontSize: 12, color: "#fff" }}>
                Xəritəni yoxlayın
              </span>
            </Button>
          )}
        />
        <DescriptionText
          label="Siqnal zamanı"
          content={dayjs(detail?.createTime).format("MMMM D, YYYY h:mm A")}
        />
        <DescriptionText
          label="mühafizə zamanı"
          content={dayjs(detail?.createTime).format("MMMM D, YYYY h:mm A")}
        />
        <DescriptionText
          label="status"
          Other={() =>
            renderStatus(
              typeof detail?.status === "undefined" ? -1 : detail?.status
            )
          }
        />

        <DescriptionText
          label="Kamera Məlumatı"
          Other={() => (
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
          )}
        />
        <DescriptionText label="mühafizə" content={detail?.guard?.log} />
        <DescriptionText
          label="menecer"
          Other={() => (
            <TextArea
              status={detail?.status || -1}
              info={detail?.manager?.log || ""}
              isHistory={isHistory || false}
              ref={processInfo}
            />
          )}
        />
        {!isHistory && (
          <div className={styles["button-container"]}>
            {detail?.status === 1 && (
              <Button
                onClick={() => handleSubmit(detail?.id)}
                loading={messageLoading}
              >
                təqdim
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
