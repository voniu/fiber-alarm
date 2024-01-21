import { useEffect, useState } from "react";
import { useModel } from "umi";
import VectorSource from "ol/source/Vector";
import Draw, { DrawEvent } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
type Point = [number, number];
export default function ({
  type,
  draw,
  setDraw,
  layer,
  setLayer,
}: {
  type: string;
  draw: any;
  setDraw: (val: any) => void;
  layer: any;
  setLayer: (val: any) => void;
}) {
  const { map, setTarget } = useModel("useMap");
  // const [draw, setDraw] = useState<any>();
  const [cameras, setCameras] = useState<Point[]>([]);
  const [fibers, setFibers] = useState<Point[][]>([]);
  const pointSource = new VectorSource({ wrapX: false });
  const lineSource = new VectorSource({ wrapX: false });
  const addInteraction = (val: any) => {
    if (draw) map.removeInteraction(draw);
    if (layer) map.removeLayer(layer);
    const pointVector = new VectorLayer({
      source: pointSource,
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
    });

    newDraw.on("drawend", function (e: DrawEvent) {
      const geometry = e.feature.getGeometry();
      if (geometry) {
        // @ts-ignore
        const coordinates = geometry.getCoordinates();
        if (isPoint) {
          setCameras([...cameras, coordinates]);
        } else {
          setFibers([...fibers, coordinates]);
        }
      }
    });

    map.addInteraction(newDraw);
    map.addLayer(newlayer);
    setDraw(newDraw);
    setLayer(newlayer);
  };
  useEffect(() => {
    console.log("EDIT MAP");
    setTarget("edit-map-container");
    addInteraction(type);
    return () => {
      if (draw) map.removeInteraction(draw);
      const dom = document.getElementById("edit-map-container");
      setTarget("");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div id="edit-map-container" style={{ height: 500, width: 600 }}></div>
    </>
  );
}
