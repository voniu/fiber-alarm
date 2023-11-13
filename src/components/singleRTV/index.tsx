import { Modal } from 'antd';
import { useModel } from 'umi';

export default function () {
    const { singlePlay, stopSinglePlay } = useModel('useRTV');
    
    return (
        <Modal footer={null} title={null} open={singlePlay} onCancel={stopSinglePlay} width={1000}>
            <video autoPlay muted style={{ width: '100%', height: 600, margin: '0 auto' }}></video>
        </Modal>
    );
};

