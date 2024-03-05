import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModel } from "umi";
import type { Camera } from "@/models/useItems";
export default function () {
  const { cameraList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId } = useModel("useMap");
  const { showPopup } = useModel("useModel");
  const { Name } = useModel("useLocaleText");

  const columns: TableColumnsType<Camera> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: Name,
      dataIndex: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
  ];

  return (
    <>
      <Table
        scroll={{ x: true }}
        rowKey={"id"}
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => {
            const id = selectedRows[0].id;
            const type = "camera";
            const feature = getFeaturesByTypeAndId(id, type);
            if (feature) {
              selectFeature(feature);
              centerTo(id, type);
              showPopup();
            }
          },
        }}
        pagination={{ pageSize: 5, showSizeChanger: false }}
        columns={columns}
        dataSource={cameraList}
        bordered
      />
    </>
  );
}
