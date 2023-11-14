import { useModel } from "umi";
import './index.css';
import secondTitlePng from '@/assets/second_title.png';
import alarmDescriptionBg from '@/assets/pushmessage_class.png'
import { useMemo } from "react";
import { Alarm } from "@/models/useAlarms";

export default function () {
    const { fiberList } = useModel('useItems');
    const { page, pageSize, fiberId, alarmList, setPage, setFiberId, total, setCurrentAlarmId } = useModel('useAlarms');


    function onClick(i: Alarm) {
        setCurrentAlarmId(i.id)
    }

    function onFiberChange(value: string) {
        const id = Number(value);
        setFiberId(id);
        setPage(1);
    }

    const hasNextPage = useMemo(() => {
        return total > pageSize * page
    }, [page, total])

    return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="map_title" style={{ backgroundImage: `url(${secondTitlePng})` }}>
            Alarm List: 
            <select value={'' + fiberId || '0'} onChange={(event) => {
                onFiberChange(event.target.value)
            }}>
                <option key="all" value='0'>all</option>
                {fiberList.map(f => {
                    return <option key={f.id} value={f.id}>{f.name}</option>
                })}
            </select>
        </div>
        <div style={{ flex: '1', overflowY: 'auto' }}>
            {alarmList.length === 0 && <div style={{ height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', color: 'white' }}>No Data</div>
            </div>}
            {alarmList.map((i) => {
                const d = new Date(i.time)
                const time = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
                return <div key={'' + i.id} onClick={() => onClick(i)} style={{ cursor: 'pointer', color: 'white', padding: '4px 6%', margin: 4, border: 'rgba(12,122,200,0.5) 1px solid' }} >
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 14, backgroundImage: `url(${alarmDescriptionBg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', padding: 2 }}>{i.description}</span>
                        <span style={{ fontSize: 12 }}>{time}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div style={{ height: 56, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                            <div style={{ fontSize: 14, }}>Triggered By: {i.fiber.name}</div>
                            <div style={{ fontSize: 12, color: 'gray' }}>Event ID: {i.id}</div>
                        </div>
                        <div>
                            {i.previewUrl ? <img style={{ height: 56 }} src={i.previewUrl} alt="" /> : <span>No Pictures</span>}
                        </div>
                    </div>
                </div>
            })}
        </div>
        <div style={{ color: '#b0a8a8', fontSize: 12, textAlign: 'center' }}><div >Page {page}</div><span style={{ cursor: page > 1 ? 'pointer' : 'not-allowed' }}>Prev</span>  |<span style={{ cursor: hasNextPage ? 'pointer' : 'not-allowed' }}>  Next</span></div>
    </div>

}