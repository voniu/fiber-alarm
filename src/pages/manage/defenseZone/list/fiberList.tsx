import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModel } from "umi";
import type { Fiber } from "@/models/useItems";

export default function () {
  const { fiberList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId, highLightTrigger } =
    useModel("useMap");
  const { showPopup } = useModel("useModel");

  const columns: TableColumnsType<Fiber> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
  ];

  return (
    <>
      <Table
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => {
            const id = selectedRows[0].id;
            const type = "fiber";
            const feature = getFeaturesByTypeAndId(id, type);
            if (feature) {
              highLightTrigger(id);
              selectFeature(feature);
              centerTo(id, type);
              showPopup();
            }
          },
        }}
        rowKey={"id"}
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={fiberList}
        bordered
      />
    </>
  );
}