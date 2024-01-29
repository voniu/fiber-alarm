import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Radio } from "antd";
import AddDevice from "@/components/addDevice";
import { useModel } from "umi";
import FiberManage from "./list/fiberManage";
import CameraManage from "./list/cameraManage";
import AddRelation from "./relation/index";
import { Camera, Fiber } from "@/models/useItems";
import { getCamera, getFiber } from "@/services/admin";
interface DeviceModal {
  operator: string;
  type: string;
  isModalOpen: boolean;
  deviceId?: number;
}
const DeviceManage = () => {
  const { map } = useModel("useMap");
  const [device, setDevice] = useState<DeviceModal>({
    operator: "add",
    type: "fiber",
    isModalOpen: false,
  });

  const [realtion, setRelation] = useState({
    isModalOpen: false,
    fiber: { id: 0, name: "" },
  });
  const [listType, setListType] = useState("fiber");

  const [draw, setDraw] = useState<any>();
  const [layer, setLayer] = useState<any>();

  const [listData, setListData] = useState<{
    fiberData: Fiber[];
    cameraData: Camera[];
  }>({ fiberData: [], cameraData: [] });
  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  const edit = (device: number, type: string) => {
    setDevice({
      operator: "edit",
      type: type,
      isModalOpen: true,
      deviceId: device,
    });
  };
  const onClose = () => {
    setDevice({ isModalOpen: false, operator: "", type: "" });
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
  };
  const fetchList = async () => {
    const { data: cameraData } = await getCamera("");
    const { data: fiberData } = await getFiber("");
    setListData({ cameraData, fiberData });
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        DeviceManage
      </p>

      <div className={styles["main"]}>
        <div className={styles["operator"]}>
          <Button
            onClick={() => {
              setDevice({ operator: "add", type: "fiber", isModalOpen: true });
            }}
          >
            Add Fiber
          </Button>
          <Button
            onClick={() => {
              setDevice({ operator: "add", type: "camera", isModalOpen: true });
            }}
          >
            Add Camera
          </Button>
        </div>
        <div className={styles["list-operator"]}>
          {/* <div style={{ display: "flex" }}>
            <Input className={styles["list-search"]} />
            <Button>Search</Button>
          </div> */}
          <div className={styles["list-type"]}>
            <Radio.Group value={listType} onChange={handleChange} size="middle">
              <Radio.Button value="fiber">fiber</Radio.Button>
              <Radio.Button value="camera">camera</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className={styles["list"]}>
          {listType === "fiber" && (
            <FiberManage
              flush={fetchList}
              data={listData?.fiberData}
              edit={edit}
              setRelation={(
                isModalOpen: boolean,
                fiber: {
                  id: number;
                  name: string;
                }
              ) => {
                setRelation({ isModalOpen, fiber });
              }}
            />
          )}
          {listType === "camera" && (
            <CameraManage
              flush={fetchList}
              data={listData?.cameraData}
              edit={edit}
            />
          )}
        </div>
      </div>
      <AddDevice
        operator={device.operator}
        addType={device.type}
        isModalOpen={device.isModalOpen}
        deviceId={device.deviceId}
        onClose={onClose}
        draw={draw}
        setDraw={(val: any) => setDraw(val)}
        layer={layer}
        setLayer={(val: any) => setLayer(val)}
      />
      <AddRelation
        isModalOpen={realtion.isModalOpen}
        fiber={realtion.fiber}
        setRelation={(
          isModalOpen: boolean,
          fiber: {
            id: number;
            name: string;
          }
        ) => {
          setRelation({ isModalOpen, fiber });
        }}
      />
    </div>
  );
};

export default WithAuth(DeviceManage);
