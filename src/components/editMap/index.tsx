import { useEffect, useState } from "react";
import { useModel } from "umi";
import VectorSource from "ol/source/Vector";
import Draw, { DrawEvent } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import { Style, Circle, Fill, Stroke } from "ol/style";
import { pointToLocation } from "@/utills";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { Button } from "antd";
export default function ({
  setLocation,
  type,
  draw,
  setDraw,
  layer,
  setLayer,
  target,
}: {
  type: string;
  draw: any;
  setDraw: (val: any) => void;
  layer: any;
  setLayer: (val: any) => void;
  setLocation: (l: any) => void;
  target?: string;
}) {
  const { map, setTarget, clearSelected } = useModel("useMap");
  // const [draw, setDraw] = useState<any>();
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
    map.addLayer(newlayer);
    setDraw(newDraw);
    setLayer(newlayer);
  };
  const resetCamera = () => {
    if (camera) {
      layer.getSource().clear();
      draw.setActive(true);
      setLocation("");
      setCamera(undefined);
    }
  };
  const resetFiber = () => {
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
    addInteraction(type);
    return () => {
      if (draw) map.removeInteraction(draw);
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
          <Button type="primary" onClick={resetCamera}>
            reset
          </Button>
          <span>(only allow draw a Point)</span>
        </div>
      )}
      {type === "LineString" && (
        <div style={{ position: "absolute", top: 25 }}>
          <Button type="primary" onClick={resetFiber}>
            reset
          </Button>
          <span>(only allow draw a fiber)</span>
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
