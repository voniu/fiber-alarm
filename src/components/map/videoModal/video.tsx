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
  useEffect(() => {
    if (RRef.current) {
      RRef.current.close();
      console.log("close");
    }
    if (!id) return;
    if (!document.getElementById(`rtsp-video-${prefix}-${id}`)) return;

    const rtsp = new RtspStream(
      `${wsUrl}/api/common/stream?id=${id}`,
      `rtsp-video-${prefix}-${id}`
    );
    rtsp.open();
    console.log(rtsp);

    RRef.current = rtsp;
    return () => {
      console.log("video close");

      if (RRef.current) RRef.current.close();
    };
  }, []);
  return (
    <div>
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
    </div>
  );
};
