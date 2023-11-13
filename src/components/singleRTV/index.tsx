import { Modal } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

export default function () {
    const { singlePlay, stopSinglePlay, singlePlayChannel, subscribe } = useModel('useRTV');
    useEffect(() => {
        if (singlePlay && singlePlayChannel) {
            console.log('211111',{ singlePlayChannel, singlePlay, dom: document.getElementById('single-video') })
            subscribe(singlePlayChannel, 'single-video');
        }
    }, [singlePlayChannel, singlePlay])

    return (
        <Modal footer={null} title={null} open={singlePlay} onCancel={stopSinglePlay} width={1000}>
            <video id='single-video' autoPlay muted style={{ width: '100%', height: 600, margin: '0 auto' }}></video>
        </Modal>
    );
};

