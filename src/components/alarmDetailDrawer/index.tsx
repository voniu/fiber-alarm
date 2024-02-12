import { Button, Col, Drawer, Input, Row, Tag, message } from "antd";
import styles from "./index.less";
import { useEffect, useRef, useState } from "react";
import { getAlarmDetail } from "@/services/admin";
import { AlarmDetail } from "@/models/useAlarms";
import dayjs from "@/utills/day";
import { useModel } from "umi";
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
  const { handleManage } = useModel("useAlarms");
  const processInfo = useRef();
  const typeMap = ["intrusion", "tamper", "wire Disconnect", "Disconnect"];
  useEffect(() => {
    console.log("dddddd");
    if (alarmID === -1) return;
    getAlarmDetail(alarmID).then((res) => {
      setDetail(res.data);
    });
  }, [alarmID]);

  const renderStatus = (status: number) => {
    const statusMap = ["pending", "processing", "solved"];
    const colorMap = ["default", "processing", "success"];
    if (status === -1) return <div>not found</div>;
    return <Tag color={colorMap[status]}>{statusMap[status]}</Tag>;
  };
  const onChange = (e: any) => {
    processInfo.current = e.target.value;
  };
  const handleSubmit = (id: number) => {
    const log = processInfo.current;
    console.log(log);
    if (!log) {
      message.info("please input the log");
      return;
    }
    handleManage(id, log);
    message.success("success");
    if (flush) flush();
    onClose();
  };
  const renderInfo = (status: number, info: string) => {
    return status === 1 && !isHistory ? (
      <Input.TextArea
        showCount
        maxLength={100}
        value={processInfo.current}
        onChange={onChange}
        placeholder="input processInfo"
        style={{ height: 120, resize: "none" }}
      />
    ) : (
      <div className={styles["info-content"]}>{info || "processing"}</div>
    );
  };
  return (
    <Drawer
      destroyOnClose
      title="Alarm Detail"
      onClose={onClose}
      open={open}
      width={500}
    >
      <div>
        <DescriptionText label="ID" content={detail?.id.toString()} />
        <DescriptionText label="FiberName" content={detail?.fiber.name} />
        <DescriptionText
          label="Type"
          content={
            typeof detail?.type === "number" ? typeMap[detail?.type] : ""
          }
        />
        <DescriptionText
          label="Alarm Time"
          content={dayjs(detail?.createTime).format("MMMM D, YYYY h:mm A")}
        />
        <DescriptionText
          label="Guard Time"
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
          label="Camera Info"
          Other={() => (
            <div className={styles["camera-scroll"]}>
              {detail?.snapshots.map((item) => {
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
        <DescriptionText label="guard" content={detail?.guard?.log} />
        <DescriptionText
          label="manage"
          Other={() =>
            renderInfo(detail?.status || -1, detail?.manager?.log || "")
          }
        />
        {!isHistory && (
          <div className={styles["button-container"]}>
            {detail?.status === 1 && (
              <Button onClick={() => handleSubmit(detail?.id)}>submit</Button>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
};
