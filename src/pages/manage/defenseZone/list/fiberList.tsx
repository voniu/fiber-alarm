import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModel } from "umi";
import type { Fiber } from "@/models/useItems";
import { useEffect } from "react";
import Online from "@/components/online";

export default function () {
  const { fiberList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId, highLightTrigger } =
    useModel("useMap");
  const { showPopup } = useModel("useModel");
  const { Name, LocationDesc, LayingText, LengthText, Status } =
    useModel("useLocaleText");

  const columns: TableColumnsType<Fiber> = [
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
      title: LayingText,
      dataIndex: "layingMethod",
      render: (text, record) => <span>{record.layingMethod}</span>,
    },
    {
      title: LengthText,
      dataIndex: "length",
      render: (text, record) => <span>{record.length}</span>,
    },
  ];
  useEffect(() => {
    console.log("fffff", fiberList);
  }, []);
  return (
    <>
      <Table
        scroll={{ x: true }}
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
        pagination={{ pageSize: 5, showSizeChanger: false }}
        columns={columns}
        dataSource={fiberList || []}
        bordered
      />
    </>
  );
}
