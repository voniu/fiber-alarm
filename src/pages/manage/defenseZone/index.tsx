import FiberList from "@/components/fiberList";
import WithAuth from "@/wrappers/auth";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import styles from "./index.less";
import { Button, Radio } from "antd";
import CameraList from "@/components/cameraList";
const DefenseZone = () => {
  const { setTarget } = useModel("useMap");
  const [listType, setListType] = useState("fiber");
  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  useEffect(() => {
    setTarget("manage-zone-map");
    return () => {
      setTarget("");
    };
  });
  return (
    <div className={styles["container"]}>
      <div className={styles["left"]}>
        <div className={styles["operator"]}>
          <Button onClick={() => {}}>Add Fiber</Button>
          <Button onClick={() => {}}>Add Camera</Button>
        </div>
        <div style={{}}>
          <Radio.Group value={listType} onChange={handleChange} size="middle">
            <Radio.Button value="fiber">fiber</Radio.Button>
            <Radio.Button value="camera">camera</Radio.Button>
          </Radio.Group>
        </div>
        <div className={styles["left-list"]}>
          {listType === "fiber" && <FiberList />}
          {listType === "camera" && <CameraList />}
        </div>
      </div>
      <div style={{ height: 500, width: 700 }} id="manage-zone-map"></div>
    </div>
  );
};

export default WithAuth(DefenseZone);
