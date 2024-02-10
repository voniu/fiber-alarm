//@ts-ignore
// import { ScrollBoard } from "@jiaminghi/data-view-react";
import styles from "./index.less";
import { useModel } from "umi";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import { Fiber } from "@/models/useItems";

export default function () {
  const { fiberList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId, highLightTrigger } =
    useModel("useMap");
  const { showPopup } = useModel("useModel");
  if (!fiberList.length) return <div>No Data</div>;

  // const config = {
  //   header: ["Name", "ID"],
  //   data: fiberList.map((i) => [i.name, i.id]),
  //   rowNum: 6,
  //   index: true,
  //   columnWidth: [50],
  //   align: ["center"],
  //   hoverPause: fiberList.length > 6,
  // };

  function onClick(id: number) {
    const type = "fiber";
    const feature = getFeaturesByTypeAndId(id, type);
    if (feature) {
      highLightTrigger(id);
      selectFeature(feature);
      centerTo(id, type);
      showPopup();
    }
  }
  const columns: TableColumnsType<Fiber> = [
    {
      title: "#",
      dataIndex: "id",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
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
      {/* <ScrollBoard config={config} onClick={onClick} /> */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: "#0A2732",
              headerBg: "#00BAFF",
              headerColor: "#000000",
              headerSplitColor: "#000000",
              headerBorderRadius: 0,
              rowHoverBg: "#0A2732",
            },
          },
          token: {
            colorBgContainer: "#003B51",
          },
        }}
      >
        <Table
          size="small"
          pagination={false}
          scroll={{ x: "max-content", y: 230 }}
          rowClassName={(_, index) =>
            index % 2 ? styles["row1"] : styles["row2"]
          }
          className={styles["table"]}
          sticky
          dataSource={fiberList}
          columns={columns}
          onRow={(record) => {
            return {
              onClick: () => onClick(record.id),
            };
          }}
        />
      </ConfigProvider>
    </>
  );
}
