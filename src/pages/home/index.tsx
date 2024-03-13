import firstTitlePng from "@/assets/first_title.png";
import secondTitlePng from "@/assets//second_title.png";
import Map from "@/components/map";
import FiberList from "@/components/fiberList";
import "./bigData.css";
import styles from "./index.less";
import AlarmModal from "@/components/alarmModal";
import WithAuth from "@/wrappers/authDuty";
import Header from "./header";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import CameraList from "@/components/cameraList";
import RtspVideo from "@/components/map/videoModal/video";
import { getMatrix } from "@/services/common";
import { MonitorSetting } from "@/type";
import { FormattedMessage } from "umi";

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
    <div className={`data_body`} style={{ minWidth: 1300, minHeight: 500 }}>
      <div style={{ height: 55, color: "#ccc", marginBottom: 5 }}>
        <Header />
      </div>
      <div className="index_tabs">
        <div className="inner" style={{ height: "100%" }}>
          <div className="left_cage" style={{ width: "25%" }}>
            <div
              className={`dataAllBorder01 cage_cl overflow-style`}
              style={{ height: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 5,
                }}
              >
                {currentCameras && (
                  <RtspVideo
                    style={{ width: "95%" }}
                    prefix="home1"
                    id={currentCameras["0-0"]}
                  />
                )}
                {currentCameras && (
                  <RtspVideo
                    style={{ width: "95%" }}
                    prefix="home2"
                    id={currentCameras["0-1"]}
                  />
                )}
                {currentCameras && (
                  <RtspVideo
                    style={{ width: "95%" }}
                    prefix="home3"
                    id={currentCameras["1-0"]}
                  />
                )}
                {currentCameras && (
                  <RtspVideo
                    style={{ width: "95%" }}
                    prefix="home4"
                    id={currentCameras["1-1"]}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="center_cage" style={{ width: "48%" }}>
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
                      <FormattedMessage id="Real-time Zone Map" />
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", height: "100%" }}>
                  <Map />
                </div>
              </div>
            </div>
          </div>
          <div className="right_cage" style={{ width: "25.6%" }}>
            <div className="dataAllBorder01 cage_cl" style={{ height: "100%" }}>
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
                    {listType === "fiber" ? (
                      <FormattedMessage id="Zone list - Fiber" />
                    ) : (
                      <FormattedMessage id="Zone list - Camera" />
                    )}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <Radio.Group
                      value={listType}
                      onChange={handleChange}
                      size="small"
                    >
                      <Radio.Button value="fiber">
                        <FormattedMessage id="fiber" />
                      </Radio.Button>
                      <Radio.Button value="camera">
                        <FormattedMessage id="camera" />
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
                <div id="home_right_list" className={styles["home_right_list"]}>
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
          </div>
        </div>
      </div>
      <AlarmModal />
    </div>
  );
}

export default WithAuth(HomePage);
