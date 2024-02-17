import firstTitlePng from "@/assets/first_title.png";
import secondTitlePng from "@/assets//second_title.png";
import Map from "@/components/map";
import FiberList from "@/components/fiberList";
import "./bigData.css";
import "./index.less";
import AlarmModal from "@/components/alarmModal";
import WithAuth from "@/wrappers/authDuty";
import Header from "./header";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import CameraList from "@/components/cameraList";
import RtspVideo from "@/components/map/videoModal/video";
import { getMatrix } from "@/services/common";
import { MonitorSetting } from "@/type";

function HomePage() {
  const [listType, setListType] = useState("fiber");
  const [currentCameras, setCurrentCameras] = useState<{
    [key: string]: any;
  }>();
  const handleChange = (e: any) => {
    setListType(e.target.value);
  };
  const fetchMartix = async () => {
    const { data: matrix } = await getMatrix();
    const camerasSetting: any = {};

    matrix.forEach((item: MonitorSetting) => {
      camerasSetting[`${item.row - 1}-${item.column - 1}`] = item.cameraId;
    });
    setCurrentCameras(camerasSetting);
  };
  useEffect(() => {
    fetchMartix();
  }, []);
  return (
    <div className="data_body">
      <div style={{ height: "8vh", color: "#ccc", paddingTop: 12 }}>
        <Header />
      </div>
      <div className="index_tabs">
        <div className="inner" style={{ height: "100%" }}>
          <div className="left_cage">
            <div className="dataAllBorder01 cage_cl" style={{ height: "48%" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {currentCameras && (
                  <RtspVideo prefix="home1" id={currentCameras["0-0"]} />
                )}
                {currentCameras && (
                  <RtspVideo prefix="home2" id={currentCameras["0-1"]} />
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {currentCameras && (
                  <RtspVideo prefix="home3" id={currentCameras["1-0"]} />
                )}
                {currentCameras && (
                  <RtspVideo prefix="home4" id={currentCameras["1-1"]} />
                )}
              </div>
            </div>
            <div
              className="dataAllBorder01 cage_cl"
              style={{ marginTop: "0.6%", height: "51.5%" }}
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
              style={{ height: "100%", position: "relative" }}
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
      <AlarmModal />
    </div>
  );
}

export default WithAuth(HomePage);
