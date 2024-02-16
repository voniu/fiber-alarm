import { useEffect, useState } from "react";
import OlMap from "ol/Map";
import { Feature, View } from "ol";
import { MultiLineString, Point } from "ol/geom";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { FullScreen, defaults, ZoomToExtent } from "ol/control";
import Stroke from "ol/style/Stroke";
import { Coordinate } from "ol/coordinate";
import Circle from "ol/style/Circle.js";
import Text from "ol/style/Text";
import Select from "ol/interaction/Select";
import { CAMERA, FIBER, mapUrl } from "@/constant";
import { useModel } from "umi";
import { getFiberDetail as getFiberDetailAdmin } from "@/services/admin";
import { getFiberDetail as getFiberDetailGuard } from "@/services/monitor";
import { Camera } from "./useItems";
import { isHome } from "@/utills";
import { getUiConfig } from "@/services/common";

let instance: OlMap;
const featuresByTypeAndId = new Map<string, Feature>();

export default function MapModel() {
  instance =
    instance ||
    new OlMap({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: mapUrl,
            // url: 'http://192.168.31.202:8000/{z}/{y}/{x}.png',
            // url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            // url: "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
            // url: "http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            // url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            projection: "EPSG:3857",
          }),
        }),
      ],
      view: new View({
        // center: [40.60328820848655, 49.67083191777059], //地图中心点
        center: [117.0509681, 39.243617],
        zoom: 16,
        projection: "EPSG:4326",
      }),
      controls: defaults({ rotate: false }).extend([
        new FullScreen(), // 全屏
      ]),
    });
  const [map, setMap] = useState<OlMap>(instance);
  const [currentItem, setCurrentItem] = useState<{ [key: string]: any }>({});
  const [clickPosition, setClickPosition] = useState<Coordinate | undefined>([
    48.206151, 40.027136,
  ]);
  const [singleClickSelect] = useState(new Select({}));

  const { showPopup, hidenPopup } = useModel("useModel");
  const { isLogin: userLogin } = useModel("useUserInfo");
  const { isLogin: adminLogin } = useModel("useAdminInfo");
  const [mapui, setMapUi] = useState<{
    center: string | null;
    zoom: number | null;
  }>({ center: null, zoom: null });
  const [zoomToExtent, setZoomToExtent] = useState(
    new ZoomToExtent({
      extent: map.getView().calculateExtent(),
    })
  );
  function getFeaturesByTypeAndId(id: number, type: string) {
    return featuresByTypeAndId.get(`${type}-${id}`);
  }
  const highLightTrigger = (fiberId: number) => {
    if (isHome()) {
      getFiberDetailGuard(fiberId).then((res) => {
        if (!res.data.triggerCameras) return;
        res.data.triggerCameras.forEach((camera: Camera) => {
          singleClickSelect
            .getFeatures()
            .push(getFeaturesByTypeAndId(camera.id, CAMERA)!);
        });
      });
    } else {
      getFiberDetailAdmin(fiberId).then((res) => {
        if (!res.data.triggerCameras) return;
        res.data.triggerCameras.forEach((camera: Camera) => {
          singleClickSelect
            .getFeatures()
            .push(getFeaturesByTypeAndId(camera.id, CAMERA)!);
        });
      });
    }
  };

  const setTarget = (id: string) => {
    map.setTarget(id);
  };

  function addPoint(
    point: Coordinate,
    id: number,
    name: string,
    type: string,
    color: string
  ) {
    let feature = new Feature({
      id,
      type,
      name, // 冗余字段
      geometry: new Point(point),
    });
    // record feature
    featuresByTypeAndId.set(`${type}-${id}`, feature);
    feature.setStyle(
      new Style({
        text: new Text({
          textAlign: "right",
          text: name + "   ",
          font: "bold 12px 微软雅黑",
          fill: new Fill({
            color: "yellow",
          }),
        }),
        image: new Circle({
          radius: 8, //半径
          fill: new Fill({
            color: color,
          }), //填充颜色
          stroke: new Stroke({
            color: "green",
            width: 1,
          }), //外环颜色和粗细
        }),
      })
    );
    let source = new VectorSource();
    source.addFeature(feature);
    let layer = new VectorLayer();
    layer.setSource(source);
    map.addLayer(layer);
  }

  function addLine(
    line: Array<Coordinate[]>,
    id: number,
    name: string,
    type: string,
    color: string
  ) {
    const featureLine = new Feature({
      id,
      type,
      name,
      geometry: new MultiLineString(line),
    });
    // record feature
    featuresByTypeAndId.set(`${type}-${id}`, featureLine);
    const source = new VectorSource();
    source.addFeature(featureLine);
    const layer = new VectorLayer({
      source,
      style: new Style({
        stroke: new Stroke({
          color: color,
          width: 4,
        }),
        text: new Text({
          textAlign: "right",
          text: name,
          font: "bold 12px 微软雅黑",
          fill: new Fill({
            color: "yellow",
          }),
        }),
      }),
    });
    map.addLayer(layer);
  }

  function toCenter(center: Coordinate) {
    map.getView().setCenter(center);
  }

  function clearSelected() {
    singleClickSelect.getFeatures().clear();
    setCurrentItem({});
    setClickPosition(undefined);
  }

  function setMapCenterZoom(center: Coordinate, newZoomLevel: number) {
    toCenter(center);
    map.getView().setZoom(newZoomLevel);
  }
  function selectFeature(feature: Feature) {
    clearSelected();
    singleClickSelect.getFeatures().push(feature);
    setCurrentItem(feature.getProperties());
  }
  const getMapConfig = async () => {
    const { data } = await getUiConfig();
    const center = data.mapCenter
      ? data.mapCenter
      : "[40.60328820848655, 49.67083191777059]";
    const zoom = data.mapScale || 14;
    setMapCenterZoom(JSON.parse(center), zoom);
    setMapUi({ center, zoom });
  };
  useEffect(() => {
    const control = new ZoomToExtent({
      extent: map.getView().calculateExtent(),
    });
    map.removeControl(zoomToExtent);
    setZoomToExtent(control);
    map.addControl(control);
  }, [mapui]);
  useEffect(() => {
    if (userLogin || adminLogin) {
      getMapConfig();
    }
  }, [userLogin, adminLogin]);
  useEffect(() => {
    map.addInteraction(singleClickSelect);
    singleClickSelect.on("select", function (event) {
      console.log("event.selected", event);
      if (event.selected.length > 0) {
        const item = event.selected[0].getProperties();
        setCurrentItem(item);
        if (item.type === "fiber") {
          highLightTrigger(item.id);
        }
        setClickPosition(
          map.getCoordinateFromPixel(
            event.mapBrowserEvent.pixel_ || [48.206151, 40.027136]
          )
        );
        if ([CAMERA, FIBER].includes(item.type)) {
          showPopup();
        }
      } else {
        setCurrentItem({});
        hidenPopup();
      }
    });
    map.on("error", (event) => {
      console.log(`An error occurred in the map:${event}`);
    });
  }, []);
  function clearMap() {
    // 获取地图的所有图层
    const layers = map.getLayers();
    // 遍历图层并移除
    layers.forEach(function (layer) {
      if (layer instanceof VectorLayer) {
        // 获取图层中的所有特征
        const source = layer.getSource();
        const features = source.getFeatures();

        // 遍历并移除每个特征
        features.forEach(function (feature: any) {
          source.removeFeature(feature);
        });
      }
    });
  }
  return {
    map,
    setMap,
    addPoint,
    addLine,
    setTarget,
    toCenter,
    setMapCenterZoom,
    currentItem,
    clickPosition,
    setClickPosition,
    getFeaturesByTypeAndId,
    selectFeature,
    clearSelected,
    highLightTrigger,
    mapui,
    setMapUi,
    clearMap,
  };
}
