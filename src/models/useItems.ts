import { useEffect, useState } from "react";
import { Coordinate } from "ol/coordinate";
import { useModel } from "umi";
import { CAMERA, FIBER } from "@/constant";
import { getFiber, getCamera } from "@/services/monitor";
import {
  getFiber as getAdminFiber,
  getCamera as getAdminCamera,
} from "@/services/admin";
import { isHome } from "@/utills";
import { message } from "antd";

const colors = [
  "#8cc540",
  "#009f5d",
  "#019fa0",
  "#019fde",
  "#007cdc",
  "#887ddd",
  "#cd7bdd",
  "#ff5675",
  "#ff1244",
  "#ff8345",
  "#f8bd0b",
];

export interface Camera {
  id: number;
  name: string;
  archived: boolean;
  location: Coordinate;
  status: number;
  locationDesc: string;
  cameraType: number;
}

export interface Fiber {
  id: number;
  name: string;
  archived: boolean;
  location: Array<Coordinate[]>;
  device: {
    id: number;
    name: string;
    type: number;
  };
  status: number;
  locationDesc: string;
  laying: number;
  length: number;
}

export default function ItemsModel() {
  const [cameras, setCameras] = useState<Map<number, Camera>>(new Map());
  const [fibers, setFibers] = useState<Map<number, Fiber>>(new Map());
  const [fiberList, setFiberList] = useState<Fiber[]>([]);
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const { isLogin: userLogin } = useModel("useUserInfo");
  const { isLogin: adminLogin } = useModel("useAdminInfo");
  const fetchGuardItem = async () => {
    const { data: fiberData } = await getFiber("");
    const { data: camerData } = await getCamera("");
    setFiberList(fiberData);
    setCameraList(camerData);
  };
  const fetchAdminItem = async () => {
    const { data: fiberData } = await getAdminFiber("", false);
    const { data: camerData } = await getAdminCamera("", false);
    setFiberList(fiberData);
    setCameraList(camerData);
  };
  const flush = ({ fiber, camera }: any) => {
    if (fiber) setFiberList(fiber);
    if (camera) setCameraList(camera);
  };
  useEffect(() => {
    if (userLogin && isHome()) fetchGuardItem();
    if (adminLogin && !isHome()) fetchAdminItem();
  }, [userLogin, adminLogin]);

  const { addPoint, addLine, toCenter, setClickPosition, clearMap } =
    useModel("useMap");

  useEffect(() => {
    if (!fiberList?.length) return;

    const map = new Map<number, Fiber>();
    fiberList.forEach((i) => {
      map.set(i.id, i);
    });
    setFibers(map);
  }, [fiberList]);

  useEffect(() => {
    if (!cameraList?.length) return;

    const map = new Map<number, Camera>();
    cameraList.forEach((i) => {
      map.set(i.id, i);
    });
    setCameras(map);
  }, [cameraList]);

  function addCamera({ id, name, location }: Camera) {
    addPoint(location, id, name, CAMERA, "red");
  }

  function addFiber({ location, id, name }: Fiber) {
    addLine(location, id, name, FIBER, colors[id % colors.length]);
  }

  function centerTo(id: number, type: string) {
    let location;
    try {
      if (type === CAMERA) {
        location = cameras.get(id)?.location;
      } else if (type === FIBER) {
        location = fibers.get(id)?.location[0][0];
      }
    } catch (e) {
      message.info("Part of the device information is missing");
    }

    if (location) {
      toCenter(location);
      setClickPosition(location);
    }
  }

  useEffect(() => {
    clearMap();
    cameras.forEach(addCamera);
    fibers.forEach(addFiber);
  }, [cameras, fibers]);

  return {
    cameras,
    fibers,
    cameraList,
    fiberList,
    addCamera,
    addFiber,
    centerTo,
    flush,
  };
}
