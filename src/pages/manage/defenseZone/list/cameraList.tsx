import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModel } from "umi";
import Online from "@/components/online";
import type { Camera } from "@/models/useItems";
import { cameraFactory, cameraFormType } from "@/constant";
export default function () {
  const { cameraList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId } = useModel("useMap");
  const { showPopup } = useModel("useModel");
  const { Name, Status, LocationDesc, CameraType, Type } =
    useModel("useLocaleText");

  const columns: TableColumnsType<Camera> = [
    {
      title: Name,
      dataIndex: "name",
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: Status,
      dataIndex: "online",
      render: (text, record) => (
        <span>{<Online online={record.online} color="black" />}</span>
      ),
    },
    {
      title: LocationDesc,
      dataIndex: "locationDesc",
      render: (text, record) => <span>{record.locationDesc}</span>,
    },
    {
      title: Type,
      dataIndex: "type",
      render: (text, record) => <span>{cameraFactory[record.type]}</span>,
    },
    {
      title: CameraType,
      dataIndex: "form",
      render: (text, record) => <span>{cameraFormType[record.form]}</span>,
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
