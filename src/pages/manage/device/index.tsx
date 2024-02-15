import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Form, Input, Radio, Checkbox } from "antd";
import AddDevice from "@/components/addDevice";
import { useModel } from "umi";
import FiberManage from "./list/fiberManage";
import CameraManage from "./list/cameraManage";
import AddRelation from "./relation/index";
import { getCamera, getFiber, getFiberControl } from "@/services/admin";
import FiberList from "./list/fiberList";
interface DeviceModal {
  operator: string;
  type: string;
  isModalOpen: boolean;
  deviceId?: number;
  deviceContent?: any;
}
const DeviceManage = () => {
  const { map } = useModel("useMap");
  const { flush } = useModel("useItems");
  const [device, setDevice] = useState<DeviceModal>({
    operator: "add",
    type: "fiber",
    isModalOpen: false,
  });

  const [realtion, setRelation] = useState({
    isModalOpen: false,
    fiber: { id: 0, name: "" },
  });
  const [listType, setListType] = useState("fiber-control");

  const [draw, setDraw] = useState<any>();
  const [layer, setLayer] = useState<any>();

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isArchived, setArchived] = useState(false);

  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  const edit = (device: number, type: string, extra?: any) => {
    if (type === "fiber-control") {
      setDevice({
        operator: "edit",
        type: type,
        isModalOpen: true,
        deviceId: device,
        deviceContent: extra,
      });
      return;
    }
    setDevice({
      operator: "edit",
      type: type,
      isModalOpen: true,
      deviceId: device,
    });
  };

  const fetchList = async () => {
    setLoading(true);
    if (listType === "fiber-control") {
      const { data: fiberControlData } = await getFiberControl("", isArchived);
      setListData(fiberControlData);
    } else if (listType === "fiber") {
      const { data: fiberData } = await getFiber("", isArchived);
      setListData(fiberData);
      flush({ fiber: fiberData });
    } else if (listType === "camera") {
      const { data: cameraData } = await getCamera("", isArchived);
      setListData(cameraData);
      flush({ camera: cameraData });
    }
    setLoading(false);
  };
  const onClose = () => {
    setDevice({
      isModalOpen: false,
      operator: device.operator,
      type: device.type,
    });
    fetchList();
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
  };
  const handleSearch = async (value: { search: string }) => {
    setLoading(true);

    if (listType === "fiber-control") {
      const { data } = await getFiberControl(value.search, isArchived);
      setListData(data);
    } else if (listType === "fiber") {
      const { data } = await getFiber(value.search, isArchived);
      setListData(data);
    } else if (listType === "camera") {
      const { data } = await getCamera(value.search, isArchived);
      setListData(data);
    }
    setLoading(false);
  };
  const handleArchive = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
    setArchived(e.target.checked);
  };
  useEffect(() => {
    fetchList();
  }, [listType, isArchived]);
  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        DeviceManage
      </p>

      <div className={styles["main"]}>
        <div className={styles["list-operator"]}>
          <div className={styles["list-type"]}>
            <Radio.Group value={listType} onChange={handleChange} size="middle">
              <Radio.Button value="fiber-control">fiberControl</Radio.Button>
              <Radio.Button value="fiber">fiber</Radio.Button>
              <Radio.Button value="camera">camera</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className={styles["operator"]}>
          <div className={styles["search"]}>
            <div>
              <Checkbox style={{ fontWeight: "bold" }} onChange={handleArchive}>
                isArchived
              </Checkbox>
            </div>
            <Form layout={"inline"} onFinish={handleSearch}>
              <Form.Item name={"search"}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Search
                </Button>
              </Form.Item>
            </Form>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setDevice({ operator: "add", type: listType, isModalOpen: true });
            }}
          >
            Add Device
          </Button>
        </div>
        <div className={styles["list"]}>
          {listType === "fiber-control" && (
            <FiberList
              isArchived={isArchived}
              loading={loading}
              flush={fetchList}
              data={listData || []}
              edit={edit}
            />
          )}
          {listType === "fiber" && (
            <FiberManage
              isArchived={isArchived}
              loading={loading}
              flush={fetchList}
              data={listData || []}
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
              isArchived={isArchived}
              loading={loading}
              flush={fetchList}
              data={listData || []}
              edit={edit}
            />
          )}
        </div>
      </div>
      <AddDevice
        operator={device.operator}
        type={device.type}
        isModalOpen={device.isModalOpen}
        deviceId={device.deviceId}
        onClose={onClose}
        draw={draw}
        setDraw={(val: any) => setDraw(val)}
        layer={layer}
        setLayer={(val: any) => setLayer(val)}
        device={device}
        flush={fetchList}
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
        flush={fetchList}
      />
    </div>
  );
};

export default WithAuth(DeviceManage);
