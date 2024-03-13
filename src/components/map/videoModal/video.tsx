import { useEffect, useRef } from "react";
import { RtspStream } from "@/libs/rtspStream";
import defaultImg from "@/assets/video/defaultVideo.webp";
import styles from "./index.less";
import { wsUrl } from "@/constant";
interface IProps {
  id?: number;
  style?: Partial<React.CSSProperties>;
  prefix: string;
}
export default (props: IProps) => {
  const { id, style, prefix } = props;
  const RRef = useRef<RtspStream>();
  const shouldReconnect = useRef(true);
  const timer = useRef<any>();
  useEffect(() => {
    if (!id) return;
    if (!document.getElementById(`rtsp-video-${prefix}-${id}`)) return;

    const rtsp = new RtspStream(
      `${wsUrl}/api/common/stream?id=${id}`,
      `rtsp-video-${prefix}-${id}`
    );
    rtsp.onOpen = () => {
      if (timer.current) clearTimeout(timer.current);
    };
    rtsp.onClose = () => {
      if (timer.current) clearTimeout(timer.current);
      if (shouldReconnect.current) {
        console.log("WS CLOSE");
        timer.current = setTimeout(() => {
          rtsp.open();
        }, 3000);
      }
    };
    rtsp.onError = () => {
      if (timer.current) clearTimeout(timer.current);
      if (shouldReconnect.current) {
        console.log("WS CLOSE ERROR");
        timer.current = setTimeout(() => {
          rtsp.open();
        }, 5000);
      }
    };
    RRef.current = rtsp;
    const save = RRef.current;
    rtsp.open();

    return () => {
      console.log("video close", save.websocket);
      shouldReconnect.current = false;
      if (save) save.close();
    };
  }, [id]);
  return (
    <>
      <div
        style={
          style || {
            margin: 2,
            height: 140,
            width: 280,
            backgroundColor: "#000",
          }
        }
      >
        <video
          className={styles["video-around"]}
          id={`rtsp-video-${prefix}-${id}`}
          autoPlay
          muted
          poster={defaultImg}
        ></video>
      </div>
    </>
  );
};
