import { useModel } from "umi";
import alarmDescriptionBg from '@/assets/pushmessage_class.png';
import secondTitlePng from '@/assets/second_title.png';
import emptyPng from '@/assets/empty.png';
import { Image } from "antd";
import { CAMERA, FIBER } from "@/constant";

export default function () {
    const { currentAlarm: alarm } = useModel('useAlarms')
    const { selectFeature, getFeaturesByTypeAndId } = useModel('useMap');
    const { showPopup } = useModel('useModel')
    const { centerTo } = useModel('useItems')

    if (!alarm) {
        return <div style={{ height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', color: 'white' }}>暂无详情数据</div>
        </div>;
    }

    const d = new Date(alarm.time)
    const time = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

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
            报警详情
        </div>
        <div style={{ flex: '1', overflowY: 'auto' }}>
            <div id={'' + alarm.id} style={{ color: 'white', padding: '4px 8px', margin: 4 }} >
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, backgroundImage: `url(${alarmDescriptionBg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', padding: 2 }}>{alarm.description}</span>
                    <div style={{ fontSize: 12, color: 'gray' }}>事件ID:{alarm.id}</div>
                </div>
                <div style={{ fontSize: 14, marginTop: 4 }}>触发设备：<span onClick={() => showFiber(alarm.fiber.id)}>{alarm.fiber.name}</span></div>
                <div style={{ fontSize: 14, marginTop: 4 }}>触发时间：{time}</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>图像数据：</div>
                {alarm.snapshots.map(pic => {
                    return <div key={'' + pic.id} style={{ margin: 4, display: 'flex', justifyContent: 'space-evenly', border: '1px solid rgba(12, 122, 200, 0.5)' }}>
                        <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', verticalAlign: 'middle', fontSize: 12 }}>
                            <div style={{ color: 'gray' }}>点位：</div>
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