import { useEffect, useState } from "react";
import { useModel } from "umi";
import VectorSource from "ol/source/Vector";
import Draw, { DrawEvent } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import { Style, Circle, Fill, Stroke } from "ol/style";
import { pointToLocation } from "@/utills";
import { Feature, Collection } from "ol";
import { Geometry } from "ol/geom";
import Modify, { ModifyEvent } from "ol/interaction/Modify";
import { Button } from "antd";
export default function ({
  setLocation,
  type,
  draw,
  setDraw,
  layer,
  setLayer,
  target,
  isEdit,
  id,
  initLocation,
}: {
  type: string;
  draw: any;
  setDraw: (val: any) => void;
  layer: any;
  setLayer: (val: any) => void;
  setLocation: (l: any) => void;
  target?: string;
  isEdit?: boolean;
  id?: number;
  initLocation?: number[] | number[][];
}) {
  const {
    map,
    setTarget,
    clearSelected,
    getFeaturesByTypeAndId,
    selectFeature,
  } = useModel("useMap");
  const { centerTo } = useModel("useItems");
  // const [draw, setDraw] = useState<any>();
  const [modify, setModify] = useState<any>();
  const [camera, setCamera] = useState<Feature<Geometry>>();
  const [fiber, setFiber] = useState<Feature<Geometry>>();
  const pointSource = new VectorSource({ wrapX: false });
  const lineSource = new VectorSource({ wrapX: false });
  const styles = {
    Point: {
      "circle-radius": 5,
      "circle-fill-color": "red",
    },
    LineString: {
      "circle-radius": 5,
      "circle-fill-color": "red",
      "stroke-color": "yellow",
      "stroke-width": 2,
    },
  };
  const addInteraction = (val: any) => {
    if (modify) map.removeInteraction(modify);
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
    const pointVector = new VectorLayer({
      source: pointSource,
      style: function (feature) {
        console.log(feature);
        // 定义图形样式
        return new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: "rgba(255, 0, 0, 0.725)",
            }),
            stroke: new Stroke({
              color: "red",
              width: 2,
            }),
          }),
        });
      },
    });
    const lineVector = new VectorLayer({
      source: lineSource,
    });
    const isPoint = val === "Point";
    const source = isPoint ? pointSource : lineSource;
    const newlayer = isPoint ? pointVector : lineVector;
    if (!isEdit) {
      const newDraw = new Draw({
        source: source,
        type: val,
        // @ts-ignore
        style: styles[val],
      });

      newDraw.on("drawend", function (e: DrawEvent) {
        console.log("Draw end");

        const geometry = e.feature.getGeometry();
        if (geometry) {
          // @ts-ignore
          const coordinates = geometry.getCoordinates();
          if (isPoint) {
            setCamera(e.feature);
            setLocation(JSON.stringify(coordinates));
            newDraw.setActive(false);
          } else {
            const location = pointToLocation(coordinates);
            setLocation(location);
            setFiber(e.feature);
            newDraw.setActive(false);
          }
        }
      });

      map.addInteraction(newDraw);
      setDraw(newDraw);
      map.addLayer(newlayer);
      setLayer(newlayer);
    }

    if (isEdit && id) {
      const t = type === "Point" ? "camera" : "fiber";
      const features: Collection<Feature<Geometry>> = new Collection();
      console.log(id, t);
      features.clear();
      features.push(getFeaturesByTypeAndId(id, t)!);
      console.log(features);

      const newModify = new Modify({
        features,
      });
      newModify.on("modifyend", (e: ModifyEvent) => {
        const modifiedFeature = e.features.getArray()[0];
        const geometry = modifiedFeature.getGeometry();
        // @ts-ignore
        const coordinates = geometry.getCoordinates();
        if (isPoint) {
          setLocation(JSON.stringify(coordinates));
        } else {
          const location = pointToLocation([
            ...coordinates[0],
            ...coordinates[1].slice(1),
          ]);
          setLocation(location);
        }
      });
      setModify(newModify);
      map.addInteraction(newModify);
    }
  };
  const restEditDevice = () => {
    const t = type === "Point" ? "camera" : "fiber";
    if (initLocation) {
      console.log(initLocation, "init");
      const feature = getFeaturesByTypeAndId(id!, t);

      if (type === "Point") {
        // @ts-ignore
        feature.getGeometry().setCoordinates(initLocation);
        setLocation(JSON.stringify(initLocation));
      } else {
        // @ts-ignore
        feature.getGeometry().setCoordinates(initLocation);

        setLocation(JSON.stringify(initLocation));
      }
    }
  };
  const resetCamera = (isEdit: boolean) => {
    if (isEdit) {
      restEditDevice();
      return;
    }
    if (camera) {
      layer.getSource().clear();
      draw.setActive(true);
      setLocation("");
      setCamera(undefined);
    }
  };
  const resetFiber = (isEdit: boolean) => {
    if (isEdit) {
      restEditDevice();
      return;
    }
    if (fiber) {
      layer.getSource().clear();
      draw.setActive(true);
      setLocation("");
      setFiber(undefined);
    }
  };

  useEffect(() => {
    console.log("EDIT MAP");
    setTarget("edit-map-container");
    clearSelected();
    const t = type === "Point" ? "camera" : "fiber";
    if (id) centerTo(id, t);
    if (isEdit && id) {
      selectFeature(getFeaturesByTypeAndId(id, t)!);
    }
    addInteraction(type);
    return () => {
      if (draw) map.removeInteraction(draw);
      if (modify) map.removeInteraction(modify);
      const dom = document.getElementById("edit-map-container");
      setTarget(target || "");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      {type === "Point" && (
        <div style={{ position: "absolute", top: 25 }}>
          <Button type="primary" onClick={() => resetCamera(isEdit!)}>
            reset
          </Button>
          {!isEdit && <span>(only allow draw a Point)</span>}
        </div>
      )}
      {type === "LineString" && (
        <div style={{ position: "absolute", top: 25 }}>
          <Button type="primary" onClick={() => resetFiber(isEdit!)}>
            reset
          </Button>
          {!isEdit && <span>(only allow draw a fiber)</span>}
        </div>
      )}
      <div
        id="edit-map-container"
        className={"base-map"}
        style={{ height: 500, width: 600 }}
      ></div>
    </>
  );
}
