import FiberList from "./list/fiberList";
import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Radio } from "antd";
import CameraList from "./list/cameraList";
import { useModel } from "umi";
import Popup from "@/components/map/popup";
import MapCenter from "./map";
import { SyncOutlined } from "@ant-design/icons";

const DefenseZone = () => {
  const { setTarget } = useModel("useMap");
  const [listType, setListType] = useState("fiber");
  const [spin, setSpin] = useState(false);
  const { fetchAdminItem } = useModel("useItems");

  const { MapSetting, Fiber, Camera } = useModel("useLocaleText");
  const flush = async () => {
    setSpin(true);
    await fetchAdminItem();
    setSpin(false);
  };
  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTarget("manage-zone-map");
    return () => {
      const dom = document.getElementById("manage-zone-map");
      setTarget("");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, []);
  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        {MapSetting}
      </p>
      <div className={styles["map-setting"]}>
        <Button type="primary" onClick={() => setOpen(true)}>
          {MapSetting}
        </Button>
      </div>
      <MapCenter open={open} onClose={() => setOpen(false)} />
      <div style={{ display: "flex" }}>
        <div className={styles["left"]}>
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 30,
              top: 20,
            }}
            onClick={flush}
          >
            <span>
              <SyncOutlined spin={spin} />
            </span>
          </div>
          <div>
            <Radio.Group value={listType} onChange={handleChange} size="middle">
              <Radio.Button value="fiber">{Fiber}</Radio.Button>
              <Radio.Button value="camera">{Camera}</Radio.Button>
            </Radio.Group>
          </div>
          <div className={styles["left-list"]}>
            {listType === "fiber" && <FiberList />}
            {listType === "camera" && <CameraList />}
          </div>
        </div>
        <div
          style={{ height: 500, width: 700 }}
          id="manage-zone-map"
          className={"base-map"}
        ></div>
        <Popup />
      </div>
    </div>
  );
};

export default WithAuth(DefenseZone);
