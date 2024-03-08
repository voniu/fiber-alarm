import { wsUrl } from "@/constant";
import { isHome } from "@/utills";
import { WebSocketClient } from "@/utills/websocket";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
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
    time?: number;
    reason: number;
  };
  manager?: {
    id: number;
    name: string;
    log: string;
    time?: number;
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
    // { id: 1 },
    // { id: 2 },
    // { id: 3 },
    // { id: 4 },
    // { id: 5 },
  ]);
  const [manageAlarm, setManageAlarm] = useState<AlarmDetail[]>([
    // { id: 1 },
    // { id: 2 },
  ]);

  const [guardSocekt, setGuardSocket] = useState<WebSocketClient>();
  const [manageSocekt, setManageSocket] = useState<WebSocketClient>();

  const [messageLoading, setMessageLoading] = useState(true);
  const shouldReconnect = useRef(true);

  const handleGuard = (id: number, reason: number, log: string) => {
    setMessageLoading(true);
    guardSocekt?.send({
      type: "RESOLVE",
      content: {
        alarmId: id,
        reason,
        log,
      },
    });
  };
  const handleManage = async (id: number, log: string) => {
    setMessageLoading(true);
    manageSocekt?.send({
      type: "RESOLVE",
      content: {
        alarmId: id,
        log,
      },
    });
  };
  const getMangerAlarm = () => {
    const socket2 = new WebSocketClient(
      `${wsUrl}/api/common/pendingAlarm?type=manager`,
      (e: MessageEvent) => {
        if (typeof e.data === "string") {
          let data = JSON.parse(e.data);
          if (data.type === "UPDATE") {
            setMessageLoading(false);
            setManageAlarm(data.content);
          } else if (data.type === "ERROR") {
            message.error(`error: ${data.content.msg}`);
          }
        }
      },
      shouldReconnect.current
    );
    setManageSocket(socket2);
  };
  const getGuardAlarm = () => {
    const socket1 = new WebSocketClient(
      `${wsUrl}/api/common/pendingAlarm?type=guard`,
      (e: MessageEvent) => {
        if (typeof e.data === "string") {
          let data = JSON.parse(e.data);
          if (data.type === "UPDATE") {
            setMessageLoading(false);
            setAlarmList(data.content);
          } else if (data.type === "ERROR") {
            message.error(`error: ${data.content.msg}`);
          }
        }
      },
      shouldReconnect.current
    );
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
      console.log("EXIT");

      shouldReconnect.current = false;
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
