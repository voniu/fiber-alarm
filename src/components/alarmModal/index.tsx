import { ConfigProvider, Modal, Tabs, Input, Button } from "antd";
import { useModel } from "umi";
import { useEffect } from "react";
import styles from "./index.less";

const TabContent = (props: { id: number }) => {
  const { setTarget } = useModel("useMap");
  const onSubmit = (e: any) => {
    console.log("Change:", e.target.value);
  };
  useEffect(() => {
    setTarget("alarm-map-container");

    return function () {
      const dom = document.getElementById("alarm-map-container");
      setTarget("");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, []);
  return (
    <div className={styles["tab-content"]}>
      <div className={styles["tab-list"]}>
        <span>alarm info{props.id}</span>
        <div className={styles["tab-info"]}></div>
        <div className={styles["tab-sub"]}>
          <Input.TextArea
            showCount
            maxLength={100}
            placeholder="input info"
            style={{ height: 120, resize: "none" }}
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
  const { currentAlarm } = useModel("useAlarms");
  const isModalOpen = !currentAlarm;
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
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `alarm ${id}`,
                key: id,
                children: <TabContent id={i} />,
              };
            })}
          />
        </ConfigProvider>
      </Modal>
    </>
  );
}
