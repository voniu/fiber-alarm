import { useEffect } from "react";
import { RtspStream } from "@/libs/rtspStream";
import defaultImg from "@/assets/video/defaultVideo.webp";
interface IProps {
  id: number;
  style?: Partial<React.CSSProperties>;
}
export default (props: IProps) => {
  const { id, style } = props;
  useEffect(() => {
    const R = new RtspStream(
      `ws://localhost:8090/api/common/stream?id=${id}`,
      `rtsp-video-${id}`
    );
    R.open();
    return () => {
      console.log("video close");
      R.close();
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
