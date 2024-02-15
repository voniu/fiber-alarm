import { useEffect } from "react";
import { useModel } from "umi";
import Popup from "@/components/map/popup";
export default function ({ id, type }: { id: number; type: string }) {
  const { centerTo } = useModel("useItems");
  const { setTarget, selectFeature, getFeaturesByTypeAndId, highLightTrigger } =
    useModel("useMap");
  const { showPopup } = useModel("useModel");
  const find = () => {
    const feature = getFeaturesByTypeAndId(id, type);
    if (feature) {
      if (type === "fiber") highLightTrigger(id);
      selectFeature(feature);
      centerTo(id, type);
      showPopup();
    }
  };
  useEffect(() => {
    console.log("find-device-map");
    setTarget("find-device-map");

    find();
    return () => {
      const dom = document.getElementById("find-device-map");
      setTarget("");
      if (dom) {
        dom.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div
        id="find-device-map"
        className={"base-map"}
        style={{ height: 500, width: 650 }}
      ></div>
      <Popup />
    </>
  );
}
