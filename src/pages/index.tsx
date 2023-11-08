// @ts-ignore
import blueVideo from '../assets/blue.mov';
import firstTitlePng from '../assets/first_title.png';
import secondTitlePng from '../assets/second_title.png';
import './bigData.css'
import Map from '@/components/map'
import Charts from '@/components/charts';
import DigitalFlop from '@/components/digitalFlop';

export default function HomePage() {
  return (
    <div className="data_body">
      <div style={{ height: 60 }}></div>
      <div className="index_tabs">

        <div className="inner" style={{ height: '100%' }}>
          <div className="left_cage">
            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '9%', height: '24%' }}>
              <video muted autoPlay loop src={blueVideo} className="dataAllBorder02 video_cage" />
            </div>
            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '1.5%', height: '38%' }}>
              <div className="dataAllBorder02 video_cage">
                <video muted autoPlay loop src={blueVideo} className="video_around" />
                <video muted autoPlay loop src={blueVideo} className="video_around" />
                <video muted autoPlay loop src={blueVideo} className="video_around" />
                <video muted autoPlay loop src={blueVideo} className="video_around" />
              </div>
            </div>
            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '1.5%', height: '32%', position: 'relative' }}>
              <Charts />
            </div>
          </div>

          <div className="center_cage">
            <div className="dataAllBorder01 cage_cl"
              style={{ marginTop: '3.5%', height: '62.7%', position: 'relative' }}>
              <div className="dataAllBorder02" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="map_title_box" style={{ height: 32 }}>
                  <div className="map_title_innerbox">
                    <div className="map_title" style={{ backgroundImage: `url(${firstTitlePng})` }}>实时布防地图</div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                  <Map />
                </div>
              </div>
            </div>

            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '0.6%', height: '32.1%' }}>
              <div className="dataAllBorder02" id="map_title_innerbox1"
                style={{ position: 'relative' }}>
                <div className="map_title_box">
                  <div className="map_title_innerbox">
                    <div className="map_title" style={{ backgroundImage: `url(${secondTitlePng})` }}>
                      防区数据</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right_cage">
            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '9%', height: '24%' }}>
              <div className="dataAllBorder02">
                <DigitalFlop />
              </div>
            </div>
            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '1.5%', height: '38%' }}>
              <div className="dataAllBorder02" >
              </div>
            </div>
            <div className="dataAllBorder01 cage_cl" style={{ marginTop: '1.5%', height: '32%' }}>
              <div className="dataAllBorder02" >
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}
