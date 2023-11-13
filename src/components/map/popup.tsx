import 'bootstrap/dist/css/bootstrap.min.css';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { Overlay } from 'ol';
import { Camera, Fiber } from '@/models/useItems';
import { CAMERA, FIBER } from '@/constant';
import { Button } from 'antd';

function CameraDetail({ camera }: { camera?: Camera }) {
    if (!camera) return <div>
        <div>NOT FOUND</div>
    </div>

    function showRTV(id: number) {
        console.log(id)
    }
    return <div>
        <div>{camera.name}</div>
        <div style={{ fontSize: 14 }}>ID: {camera.id}</div>
        <div style={{ fontSize: 14 }}>坐标：{camera.location.toString()}</div>
        <Button ghost onClick={() => showRTV(camera.id)}>查看视频</Button>
    </div>
}

function FiberDetail({ fiber }: { fiber?: Fiber }) {
    if (!fiber) return <div>
        <div>NOT FOUND</div>
    </div>
    return <div>
        <div>{fiber?.name}</div>
        <div style={{ fontSize: 14 }}>ID: {fiber.id}</div>
        {/* <div>坐标：{fiber?.location.toString()}</div> */}
    </div>
}

export default function () {
    const { popupDisplay } = useModel('useModel')
    const { cameras, fibers } = useModel('useItems');
    const { map, currentItem, clickPosition } = useModel('useMap');
    const [overlayer] = useState(new Overlay({}))

    useEffect(() => {
        overlayer.setPosition(clickPosition)
        overlayer.setElement(document.getElementById('map-popup')!)
        map.addOverlay(overlayer)
        // TODO: remove it
    }, [clickPosition])

    return <div id='map-popup' style={{ maxWidth: 300, border: '1px solid rgba(12, 122, 200, 0.7)', overflow: 'hidden', backgroundColor: 'rgba(12, 122, 200, 0.6)', borderRadius: 4, color: '#fff', padding: 4, display: popupDisplay ? 'block' : 'none' }}>
        {/* <div style={{ float: 'right' }}>
            <CloseButton onClick={hidenPopup} />
        </div> */}

        {currentItem.type === CAMERA && <CameraDetail camera={cameras.get(currentItem.id)} />}
        {currentItem.type === FIBER && <FiberDetail fiber={fibers.get(currentItem.id)} />}
    </div>
}