import { useEffect, useState } from "react";
import { RtspStream } from "@/libs/rtspStream";
import defaultImg from "@/assets/video/defaultVideo.webp";
import styles from "./index.less";
interface IProps {
  id: number;
  style?: Partial<React.CSSProperties>;
  prefix: string;
}
export default (props: IProps) => {
  const { id, style, prefix } = props;
  const [R, setR] = useState<RtspStream>();
  useEffect(() => {
    if (R) {
      R.close();
      console.log("close");
    }
    if (!id) return;
    if (!document.getElementById(`rtsp-video-${prefix}-${id}`)) return;

    const rtsp = new RtspStream(
      `ws://localhost:8090/api/common/stream?id=${id}`,
      `rtsp-video-${prefix}-${id}`
    );
    rtsp.open();
    setR(rtsp);
    return () => {
      console.log("video close");
      if (R) R.close();
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
