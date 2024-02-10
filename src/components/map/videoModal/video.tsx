import { useEffect, useState } from "react";
import { RtspStream } from "@/libs/rtspStream";
import defaultImg from "@/assets/video/defaultVideo.webp";
interface IProps {
  id: number;
  style?: Partial<React.CSSProperties>;
}
export default (props: IProps) => {
  const { id, style } = props;
  const [R, setR] = useState<RtspStream>();
  useEffect(() => {
    if (R) {
      R.close();
      console.log("close");
    }
    const rtsp = new RtspStream(
      `ws://localhost:8090/api/common/stream?id=${id}`,
      `rtsp-video-${id}`
    );
    rtsp.open();
    setR(rtsp);
    return () => {
      console.log("video close");
      if (R) R.close();
    };
  }, []);
  return (
    <>
      <video
        style={style || { height: 140, margin: "2px 5px" }}
        id={`rtsp-video-${id}`}
        autoPlay
        muted
        poster={defaultImg}
      ></video>
    </>
  );
};
