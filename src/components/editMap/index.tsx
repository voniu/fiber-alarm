import { Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import styles from "./index.less";
import VectorSource from "ol/source/Vector";
import Draw, { DrawEvent } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
type Point = [number, number];
export default function () {
  const { map, setTarget } = useModel("useMap");
  const [type, setType] = useState("");
  const [draw, setDraw] = useState<any>();
  const [cameras, setCameras] = useState<Point[]>([]);
  const [fibers, setFibers] = useState<Point[][]>([]);
  const pointSource = new VectorSource({ wrapX: false });
  const lineSource = new VectorSource({ wrapX: false });
  useEffect(() => {
    setTarget("edit-map-container");
    return () => {
      setTarget("");
    };
  }, []);
  const addInteraction = (val: any) => {
    console.log(draw);

    if (draw) map.removeInteraction(draw);
    console.log(draw);
    const pointVector = new VectorLayer({
      source: pointSource,
    });
    const lineVector = new VectorLayer({
      source: lineSource,
    });
    const isPoint = val === "Point";
    const source = isPoint ? pointSource : lineSource;
    const layer = isPoint ? pointVector : lineVector;
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
    map.addLayer(layer);
    setDraw(newDraw);
  };
  const onTypeChange = (e: RadioChangeEvent) => {
    const val = e.target.value;
    setType(val);
    addInteraction(val);
  };
  return (
    <>
      <div id="edit-map-container" style={{ height: 300, width: 700 }}></div>
      <div className={styles["operator-container"]}>
        <div></div>
        <Radio.Group value={type} onChange={onTypeChange}>
          <Radio.Button value="Point">添加摄像头</Radio.Button>
          <Radio.Button value="LineString">添加光纤</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
}
