// @ts-ignore
import blueVideo from "../assets/blue.mov";
import firstTitlePng from "../assets/first_title.png";
import secondTitlePng from "../assets/second_title.png";
import Map from "@/components/map";
import Charts from "@/components/charts";
import DigitalFlop from "@/components/digitalFlop";
import FiberList from "@/components/fiberList";
import AlarmList from "@/components/alarmList";
import AlarmDetail from "@/components/alarmDetail";
import SingleRTV from "@/components/singleRTV";
import GridRTV from "@/components/gridRTV";
import { Decoration7 } from "@jiaminghi/data-view-react";
import "./bigData.css";
import "./index.less";
import AlarmModal from "@/components/alarmModal";
import WithAuth from "@/wrappers/auth";
import Header from "./home/header";
const REAL_TIME_VIDEO_DISABLE = process.env.MOCK === "true";

function HomePage() {
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
              {!REAL_TIME_VIDEO_DISABLE && <GridRTV />}
            </div>
            {/* <div
              className="dataAllBorder01 cage_cl"
              style={{ marginTop: "1.5%", height: "32%", position: "relative" }}
            >
              <Charts />
            </div> */}
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
                  overflow: "auto",
                }}
              >
                <div className="map_title_box">
                  <div
                    className="map_title"
                    style={{ backgroundImage: `url(${secondTitlePng})` }}
                  >
                    Defense Area Info
                  </div>
                </div>
                <div style={{ flex: "1" }}>
                  <FiberList />
                </div>
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

          {/* <div className="right_cage">
            <div className="dataAllBorder01 cage_cl" style={{ height: "30%" }}>
              <div
                className="dataAllBorder01"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <DigitalFlop />
              </div>
            </div>
            <div
              className="dataAllBorder01 cage_cl"
              style={{ marginTop: "1.5%", height: "34%" }}
            >
              <AlarmList />
            </div>
            <div
              className="dataAllBorder01 cage_cl"
              style={{ marginTop: "1.5%", height: "30%" }}
            >
              <AlarmDetail />
            </div>
          </div> */}
        </div>
      </div>
      <SingleRTV />
      <AlarmModal />
    </div>
  );
}

export default WithAuth(HomePage);
