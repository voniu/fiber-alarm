import { useModel, useRequest } from 'umi';
import { useEffect, useState } from "react"
import services from '@/services';
import ee from '@/libs/events';
import { message } from 'antd';

export interface Alarm {
    id: number;
    time: number;    //unix时间戳
    fiber: {
        id: number;
        name: string;
    },
    description: string;
    previewUrl: string;
}

export interface AlarmDetail extends Alarm {
    snapshots: Array<{
        id: number,
        camera: {
            id: number,
            name: string,
        },
        picUrl: string,
    }>,
}

const alarms = new Map<number, AlarmDetail>()

export default function Alarms() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [fiberId, setFiberId] = useState(0);
    const [alarmList, setAlarmList] = useState<Alarm[]>([])
    const [total, setTotal] = useState(0)
    const [currentAlarm, setCurrentAlarm] = useState<AlarmDetail>()
    const [currentAlarmId, setCurrentAlarmId] = useState(0);

    const { run } = useRequest(() => {
        return services.getAlarmList({ page, pageSize, fiberId });
    }, {
        refreshDeps: [page, pageSize, fiberId],
        onSuccess: data => {
            setAlarmList(data)
            if (data.length > 1) {
                setCurrentAlarmId(data[0].id)
            }
        },
        formatResult: res => {
            setTotal(res.total)
            return res.data
        }
    });

    useRequest(() => {
        return services.getAlarmDetail(currentAlarmId)
    }, {
        onSuccess: (data) => {
            console.log(data)
            setCurrentAlarm(data)
            alarms.set(currentAlarmId, data)
        },
        refreshDeps: [currentAlarmId],
        ready: currentAlarmId !== 0
    })

    useEffect(() => {
        ee.on('ALARM', function (data) {
            console.log(data)
            message.warning(`New alarm: [${data.description}] from fiber [${data.fiber.name}], please check it.`)
            if (page === 1 && !fiberId) {
                run()
            } else {
                setPage(1);
                setPageSize(20);
                setFiberId(0);
            }
        })
    }, [])

    return {
        alarms,
        alarmList,
        page,
        setPage,
        pageSize,
        setPageSize,
        fiberId,
        setFiberId,
        total,
        currentAlarmId,
        setCurrentAlarmId,
        currentAlarm
    }
}