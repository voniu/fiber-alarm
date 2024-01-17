import { Button, Col, Drawer, Input, Row, Tag } from "antd";
import styles from "./index.less";
import { useEffect, useMemo, useRef } from "react";
interface IProps {
  open: boolean;
  onClose: () => void;
  detail: any;
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
        <Col span={4}>
          <div className={styles["info-label"]}>{label}:</div>
        </Col>
        <Col span={8}>
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
  const { open, onClose, detail } = props;
  const { name, fiber, description, status, guard, manager } = detail;
  const processInfo = useRef();
  const statusMemo = useMemo(() => status, [status]);
  useEffect(() => {}, []);

  const renderStatus = (status: number) => {
    const statusMap = ["pending", "processing", "solved"];
    const colorMap = ["default", "processing", "success"];
    return <Tag color={colorMap[status]}>{statusMap[status]}</Tag>;
  };
  const onChange = (e: any) => {
    processInfo.current = e.target.value;
  };
  const handleSubmit = () => {
    console.log(processInfo.current);
  };
  const renderInfo = (status: number, info: string) => {
    return statusMemo === 1 ? (
      <Input.TextArea
        showCount
        maxLength={100}
        value={processInfo.current}
        onChange={onChange}
        placeholder="input processInfo"
        style={{ height: 120, resize: "none" }}
      />
    ) : (
      <div className={styles["info-content"]}>{info}</div>
    );
  };
  return (
    <Drawer title="Alarm Detail" onClose={onClose} open={open} width={700}>
      <div>
        <DescriptionText label="Name" content={name} />
        <DescriptionText label="FiberName" content={fiber.name} />
        <DescriptionText label="description" content={description} />
        <DescriptionText label="status" Other={() => renderStatus(status)} />

        <DescriptionText
          label="image"
          Other={() => (
            <div className={styles["info-content"]}>
              <img
                className={styles["info-image"]}
                src="https://images.unsplash.com/photo-1682686580186-b55d2a91053c?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          )}
        />
        <DescriptionText label="guard" content={guard?.log} />
        <DescriptionText
          label="manage"
          Other={() => renderInfo(status, manager?.log)}
        />
        <div className={styles["button-container"]}>
          {status === 1 && <Button onClick={handleSubmit}>submit</Button>}
        </div>
      </div>
    </Drawer>
  );
};
