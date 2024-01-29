import 'bootstrap/dist/css/bootstrap.min.css';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { Overlay } from 'ol';
import { Camera, Fiber } from '@/models/useItems';
import { CAMERA, FIBER } from '@/constant';
import { Button } from 'antd';
import { getFiberDetail } from '@/services/monitor';
import { FiberDetail } from '@/type';

function CameraDetail({ camera }: { camera?: Camera }) {
    const { startSinglePlay } = useModel('useRTV');

    if (!camera) return <div>
        <div>NOT FOUND</div>
    </div>

    function showRTV(id: number) {
        startSinglePlay(id);
    }

    return <div>
        <div>{camera.name}</div>
        <div style={{ fontSize: 14 }}>ID: {camera.id}</div>
        <div style={{ fontSize: 14 }}>Location: {camera.location.toString()}</div>
        <Button ghost onClick={() => showRTV(camera.id)}>View Camera</Button>
    </div>
}

function FiberDetailList({ fiber }: { fiber?: Fiber }) {
    console.log(fiber,"dsajdksaj");
    const [fiberDetail,setDetail] = useState<FiberDetail>()
    useEffect(()=>{
        getFiberDetail(fiber!.id).then((res)=>{
            setDetail(res.data)
        })
    },[])
    if (!fiber) return <div>
        <div>NOT FOUND</div>
    </div>
    return (
      <div>
        <div>{fiber?.name}</div>
        <div style={{ fontSize: 14 }}>ID: {fiber.id}</div>
        {fiberDetail?.triggerCameras.map((item) => {
          return <div key={item.id}>{`camera: ${item.name}`}</div>;
        })}
      </div>
    );
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
        return () => {
            overlayer.setPosition(undefined)
        }
    }, [clickPosition])

    return <div id='map-popup' style={{ maxWidth: 300, border: '1px solid rgba(12, 122, 200, 0.7)', overflow: 'hidden', backgroundColor: 'rgba(12, 122, 200, 0.6)', borderRadius: 4, color: '#fff', padding: 4, display: popupDisplay ? 'block' : 'none' }}>
        {/* <div style={{ float: 'right' }}>
            <CloseButton onClick={hidenPopup} />
        </div> */}

        {currentItem.type === CAMERA && <CameraDetail camera={cameras.get(currentItem.id)} />}
        {currentItem.type === FIBER && <FiberDetailList fiber={fibers.get(currentItem.id)} />}
    </div>
}