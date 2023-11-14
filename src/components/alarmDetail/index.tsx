import { useModel } from "umi";
import alarmDescriptionBg from '@/assets/pushmessage_class.png';
import secondTitlePng from '@/assets/second_title.png';
import emptyPng from '@/assets/empty.png';
import { Image } from "antd";
import { CAMERA, FIBER } from "@/constant";
import dayjs from 'dayjs';

export default function () {
    const { currentAlarm: alarm } = useModel('useAlarms')
    const { selectFeature, getFeaturesByTypeAndId } = useModel('useMap');
    const { showPopup } = useModel('useModel')
    const { centerTo } = useModel('useItems')

    if (!alarm) {
        return <div style={{ height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', color: 'white' }}>No Data</div>
        </div>;
    }

    function showFiber(id: number) {
        const feature = getFeaturesByTypeAndId(id, FIBER)
        if (feature) {
            selectFeature(feature)
            centerTo(id, FIBER)
            showPopup()
        }
    }

    function showCamera(id: number) {
        const feature = getFeaturesByTypeAndId(id, CAMERA)
        if (feature) {
            selectFeature(feature)
            centerTo(id, CAMERA)
            showPopup()
        }
    }

    return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="map_title" style={{ backgroundImage: `url(${secondTitlePng})` }}>
            Alarm Details
        </div>
        <div style={{ flex: '1', overflowY: 'auto' }}>
            <div id={'' + alarm.id} style={{ color: 'white', padding: '4px 8px', margin: 4 }} >
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, backgroundImage: `url(${alarmDescriptionBg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', padding: 2 }}>{alarm.description}</span>
                    <div style={{ fontSize: 12, color: 'gray' }}>Event ID: {alarm.id}</div>
                </div>
                <div style={{ fontSize: 14, marginTop: 4 }}>Triggered By: <span onClick={() => showFiber(alarm.fiber.id)}>{alarm.fiber.name}</span></div>
                <div style={{ fontSize: 14, marginTop: 4 }}>Time: {dayjs(alarm.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>Captured Images: </div>
                {alarm.snapshots.map(pic => {
                    return <div key={'' + pic.id} style={{ margin: 4, display: 'flex', justifyContent: 'space-evenly', border: '1px solid rgba(12, 122, 200, 0.5)' }}>
                        <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', verticalAlign: 'middle', fontSize: 12 }}>
                            <div style={{ color: 'gray' }}>Camera: </div>
                            <div onClick={() => showCamera(pic.camera.id)} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#10a4db' }}>{pic.camera.name}</div>
                        </div>
                        <Image
                            width={64}
                            height={48}
                            src={pic.picUrl}
                            fallback={emptyPng}
                        />
                    </div>
                })}
            </div>
        </div>
    </div>



}