import { useEffect } from "react";
import { RtspStream } from "@/libs/rtspStream";
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
      R.close();
    };
  }, []);
  return (
    <>
      <video style={style} id={`rtsp-video-${id}`} autoPlay muted></video>
    </>
  );
};
