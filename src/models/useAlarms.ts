import { useEffect, useState } from "react";
import ee from "@/libs/events";

export interface Alarm {
  id: number;
}

export interface AlarmDetail extends Alarm {
  createTime: number; //unix时间戳
  fiber: {
    id: number;
    name: string;
  };
  description: string;
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [fiberId, setFiberId] = useState(0);
  const [alarmList, setAlarmList] = useState<Alarm[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  // const [total, setTotal] = useState(0)
  // const [currentAlarm, setCurrentAlarm] = useState<AlarmDetail>()
  const [currentAlarmId, setCurrentAlarmId] = useState(0);

  useEffect(() => {
    ee.on("ALARM", function (data) {
      console.log(data);
      setAlarmList(data);
    });
  }, []);

  return {
    alarms,
    alarmList,
    page,
    setPage,
    pageSize,
    setPageSize,
    fiberId,
    setFiberId,
    // total,
    currentAlarmId,
    setCurrentAlarmId,
    // currentAlarm
  };
}
