import { wsUrl } from "@/constant";
import { isHome } from "@/utills";
import { useEffect, useState } from "react";
import { useModel } from "umi";

export interface Alarm {
  id: number;
}

export interface AlarmDetail extends Alarm {
  createTime: number; //unix时间戳
  fiber: {
    id: number;
    name: string;
  };
  type: number;
  previewUrl: string;
  status: number;
  guard?: {
    id: number;
    name: string;
    log: string;
  };
  manager?: {
    id: number;
    name: string;
    log: string;
  };
  snapshots: Array<{
    id: number;
    camera: {
      id: number;
      name: string;
    };
    picUrl: string;
  }>;
}

const alarms = new Map<number, AlarmDetail>();

export default function Alarms() {
  const { isLogin: userLogin, isOnDuty } = useModel("useUserInfo");
  const { isLogin: adminLogin, admin } = useModel("useAdminInfo");
  const [alarmList, setAlarmList] = useState<AlarmDetail[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  const [manageAlarm, setManageAlarm] = useState<AlarmDetail[]>([
    // { id: 1 },
    // { id: 2 },
  ]);

  const [guardSocekt, setGuardSocket] = useState<WebSocket>();
  const [manageSocekt, setManageSocket] = useState<WebSocket>();

  const [messageLoading, setMessageLoading] = useState(true);
  const handleGuard = (id: number, log: string) => {
    setMessageLoading(true);
    guardSocekt?.send(
      JSON.stringify({
        type: "RESOLVE",
        content: {
          alarmId: id,
          log,
        },
      })
    );
  };
  const handleManage = async (id: number, log: string) => {
    setMessageLoading(true);
    manageSocekt?.send(
      JSON.stringify({
        type: "RESOLVE",
        content: {
          alarmId: id,
          log,
        },
      })
    );
  };
  const getMangerAlarm = () => {
    const socket2 = new WebSocket(
      `${wsUrl}/api/common/pendingAlarm?type=manager`
    );
    socket2.onmessage = (e: MessageEvent) => {
      if (typeof e.data === "string") {
        let data = JSON.parse(e.data);
        if (data.type === "UPDATE") {
          setMessageLoading(false);
          setManageAlarm(data.content);
        }
      }
    };
    setManageSocket(socket2);
  };
  const getGuardAlarm = () => {
    const socket1 = new WebSocket(
      `${wsUrl}/api/common/pendingAlarm?type=guard`
    );
    console.log(socket1);

    socket1.onmessage = (e: MessageEvent) => {
      if (typeof e.data === "string") {
        let data = JSON.parse(e.data);
        if (data.type === "UPDATE") {
          setMessageLoading(false);
          setAlarmList(data.content);
        }
      }
    };
    setGuardSocket(socket1);
  };
  useEffect(() => {
    if (manageSocekt) manageSocekt.close();
    if (guardSocekt) guardSocekt.close();
    if (adminLogin && !isHome() && admin?.type === 2) {
      getMangerAlarm();
    }
    if (userLogin && isHome() && isOnDuty) {
      getGuardAlarm();
    }

    return () => {
      manageSocekt?.close();
      guardSocekt?.close();
    };
  }, [userLogin, adminLogin, isOnDuty, admin]);

  return {
    alarms,
    alarmList,
    manageAlarm,
    handleManage,
    handleGuard,
    messageLoading,
    // page,
    // setPage,
    // pageSize,
    // setPageSize,
    // fiberId,
    // setFiberId,
    // total,
    // currentAlarmId,
    // setCurrentAlarmId,
    // currentAlarm
  };
}
