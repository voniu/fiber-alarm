import { useEffect, useState } from "react";
import { RtspStream } from '@/libs/rtspStream';
import { useModel } from "umi";

const wsUrl = `ws://${location.host}/ws`
let rtsp: RtspStream | null;;
const subscribed = new Set<number>();

function connect() {
    disconnect();
    rtsp = new RtspStream(wsUrl);
    rtsp.open();
}

function disconnect() {
    if (rtsp) {
        rtsp.close();
        rtsp = null;
    }
}

function subscribe(cameraId: number, videoDOMId: string) {
    if (!rtsp) {
        alert("请先连接websocket");
        return;
    }
    rtsp.subscribe(cameraId, videoDOMId);
    subscribed.add(cameraId);
}

function unsubscribe(cameraId: number) {
    if (!rtsp) {
        alert("请先连接websocket");
        return;
    }
    rtsp.unsubscribe(cameraId);
    subscribed.delete(cameraId);
}

export default function RTV() {
    const { cameraList } = useModel('useItems');
    const [gridPlay, setGridPlay] = useState(true);
    const [singlePlay, setSinglePlay] = useState(false);


    useEffect(() => {
        connect()
        return () => {
            disconnect()
        }
    }, [])

    function unsubscribeAll() {
        subscribed.forEach(id => {
            unsubscribe(id);
        })
        subscribed.clear();
    }

    function startGridPlay() {
        unsubscribeAll(); // 必须交给 model 处理，最先调用取消订阅
        setGridPlay(true);
    }

    function startSinglePlay(camId: number, videoId: string) {
        unsubscribeAll();
        setSinglePlay(true);
        setGridPlay(false);
        subscribe(camId, videoId);
    }

    function stopSinglePlay() {
        unsubscribeAll();
        setSinglePlay(false);
        setGridPlay(true);
    }


    return {
        gridPlay,
        setGridPlay,
        singlePlay,
        setSinglePlay,
        subscribed,
        subscribe,
        unsubscribe,
        unsubscribeAll,
        startGridPlay,
        startSinglePlay,
        stopSinglePlay
    }
}