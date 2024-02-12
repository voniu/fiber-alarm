import { useEffect, useState } from "react";
import { RtspStream } from "@/libs/rtspStream";
import defaultImg from "@/assets/video/defaultVideo.webp";
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
    <div
      style={{
        height: 140,
        width: 300,
      }}
    >
      <video
        style={style || { height: 140, margin: "2px 5px", width: 280 }}
        id={`rtsp-video-${prefix}-${id}`}
        autoPlay
        muted
        poster={defaultImg}
      ></video>
    </div>
  );
};
