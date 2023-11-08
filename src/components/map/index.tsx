import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef, useState } from 'react';
import { fromLonLat } from 'ol/proj'
import { defaults, FullScreen, MousePosition, ScaleLine, Attribution } from 'ol/control'

function MapWrapper() {

  const mapElement = useRef()
  useEffect(() => {
    new Map({
      target: 'map-container',
      layers: [
        new TileLayer({
          source: new XYZ({
            // url: 'http://127.0.0.1:8080/{z}/{y}/{x}.jpg'
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: fromLonLat([39.6918898, 37.1684838]),//地图中心点
        zoom: 4,
      }),
      controls: defaults().extend([
        new FullScreen(), // 全屏
        new MousePosition(), // 显示鼠标当前位置的经纬度
        new ScaleLine(),// 显示比例尺
      ])
    });
  }, [])
  return (
    <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
  )

}


export default MapWrapper;
