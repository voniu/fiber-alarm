//@ts-ignore
import { ScrollBoard } from "@jiaminghi/data-view-react";
import "./index.css";
import { useModel } from "umi";

export default function () {
  const { fiberList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId, highLightTrigger } =
    useModel("useMap");
  const { showPopup } = useModel("useModel");
  if (!fiberList.length) return <div>No Data</div>;

  const config = {
    header: ["Name", "ID"],
    data: fiberList.map((i) => [i.name, i.id]),
    rowNum: 6,
    index: true,
    columnWidth: [50],
    align: ["center"],
  };

  function onClick({ row }: { row: [any, any, number, any] }) {
    const id = row[2];
    const type = "fiber";
    const feature = getFeaturesByTypeAndId(id, type);
    if (feature) {
      highLightTrigger(id);
      selectFeature(feature);
      centerTo(id, type);
      showPopup();
    }
  }

  return (
    <>
      <ScrollBoard config={config} onClick={onClick} />
    </>
  );
}
