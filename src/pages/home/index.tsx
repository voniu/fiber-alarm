import firstTitlePng from "@/assets/first_title.png";
import secondTitlePng from "@/assets//second_title.png";
import Map from "@/components/map";
import FiberList from "@/components/fiberList";
import SingleRTV from "@/components/singleRTV";
import "./bigData.css";
import "./index.less";
import AlarmModal from "@/components/alarmModal";
import WithAuth from "@/wrappers/authDuty";
import Header from "./header";
import { Radio } from "antd";
import { useState } from "react";
import CameraList from "@/components/cameraList";
// import video1 from "@/assets/video/1.png";
// import video2 from "@/assets/video/2.png";
// import video3 from "@/assets/video/3.png";
// import video4 from "@/assets/video/4.png";
import RtspVideo from "@/components/map/videoModal/video";

function HomePage() {
  const [listType, setListType] = useState("fiber");
  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  return (
    <div className="data_body">
      <div style={{ height: "10vh", color: "#ccc", paddingTop: 12 }}>
        <Header />
      </div>
      <div className="index_tabs">
        <div className="inner" style={{ height: "100%" }}>
          <div className="left_cage">
            {/* <div className="dataAllBorder01 cage_cl" style={{ height: "24%" }}>
              <video
                muted
                autoPlay
                loop
                src={blueVideo}
                className="dataAllBorder01 video_cage"
              />
            </div> */}
            <div className="dataAllBorder01 cage_cl" style={{ height: "48%" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RtspVideo id={1} />
                <RtspVideo id={2} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RtspVideo id={3} />
                <RtspVideo id={4} />
              </div>
            </div>
            <div
              className="dataAllBorder01 cage_cl"
              style={{ marginTop: "0.6%", height: "50.1%" }}
            >
              <div
                className="dataAllBorder01"
                id="map_title_innerbox1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div className="map_title_box">
                  <div
                    className="map_title"
                    style={{ backgroundImage: `url(${secondTitlePng})` }}
                  >
                    Defense Area Info
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 10,
                    }}
                  >
                    <Radio.Group
                      value={listType}
                      onChange={handleChange}
                      size="small"
                    >
                      <Radio.Button value="fiber">fiber</Radio.Button>
                      <Radio.Button value="camera">camera</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
                {listType === "fiber" ? (
                  <div style={{ flex: "1" }}>
                    <FiberList />
                  </div>
                ) : (
                  <div style={{ flex: "1" }}>
                    <CameraList />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="center_cage">
            <div
              className="dataAllBorder01 cage_cl"
              style={{ height: "98%", position: "relative" }}
            >
              <div
                className="dataAllBorder01"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="map_title_box" style={{ height: 32 }}>
                  <div className="map_title_innerbox">
                    <div
                      className="map_title"
                      style={{ backgroundImage: `url(${firstTitlePng})` }}
                    >
                      Real-Time Defense Area Map
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", height: "100%" }}>
                  <Map />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SingleRTV />
      <AlarmModal />
    </div>
  );
}

export default WithAuth(HomePage);
