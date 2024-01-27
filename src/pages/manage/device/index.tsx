import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Input, Radio } from "antd";
import AddDevice from "@/components/addDevice";
import { useModel } from "umi";
import FiberManage from "./list/fiberManage";
import CameraManage from "./list/cameraManage";
const DeviceManage = () => {
  const { map } = useModel("useMap");
  const [listType, setListType] = useState("fiber");
  const [isModalOpen, setModalOpen] = useState(false);
  const [draw, setDraw] = useState<any>();
  const [layer, setLayer] = useState<any>();
  const [addType, setAddType] = useState<string>("camera");
  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  const onClose = () => {
    setModalOpen(false);
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
  };
  useEffect(() => {}, []);
  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        DeviceManage
      </p>

      <div className={styles["main"]}>
        <div className={styles["operator"]}>
          <Button
            onClick={() => {
              setModalOpen(true);
              setAddType("fiber");
            }}
          >
            Add Fiber
          </Button>
          <Button
            onClick={() => {
              setModalOpen(true);
              setAddType("camera");
            }}
          >
            Add Camera
          </Button>
        </div>
        <div className={styles["list-operator"]}>
          <div style={{ display: "flex" }}>
            <Input className={styles["list-search"]} />
            <Button>Search</Button>
          </div>
          <div className={styles["list-type"]}>
            <Radio.Group value={listType} onChange={handleChange} size="middle">
              <Radio.Button value="fiber">fiber</Radio.Button>
              <Radio.Button value="camera">camera</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className={styles["list"]}>
          {listType === "fiber" && <FiberManage />}
          {listType === "camera" && <CameraManage />}
        </div>
      </div>
      <AddDevice
        isModalOpen={isModalOpen}
        addType={addType}
        onClose={onClose}
        draw={draw}
        setDraw={(val: any) => setDraw(val)}
        layer={layer}
        setLayer={(val: any) => setLayer(val)}
      />
    </div>
  );
};

export default WithAuth(DeviceManage);
