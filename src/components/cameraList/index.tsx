//@ts-ignore
// import { ScrollBoard } from "@jiaminghi/data-view-react";
import styles from "./index.less";
import { useModel } from "umi";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import { Camera } from "@/models/useItems";

export default function () {
  const { cameraList, centerTo } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId } = useModel("useMap");
  const { showPopup } = useModel("useModel");

  const { Name, Status, LocationDesc, CameraType } = useModel("useLocaleText");
  if (!cameraList.length) return <div>No Data</div>;
  const columns: TableColumnsType<Camera> = [
    {
      title: Name,
      dataIndex: "name",
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: Status,
      dataIndex: "status",
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: LocationDesc,
      dataIndex: "locationDesc",
      render: (text, record) => <span>{record.locationDesc}</span>,
    },
    {
      title: CameraType,
      dataIndex: "cameraType ",
      render: (text, record) => <span>{record.cameraType}</span>,
    },
  ];
  //   const config = {
  //     header: ["Name", "ID"],
  //     data: cameraList.map((i) => [i.name, i.id]),
  //     rowNum: 6,
  //     index: true,
  //     columnWidth: [50],
  //     align: ["center"],
  //   };

  function onClick(id: number) {
    const type = "camera";
    const feature = getFeaturesByTypeAndId(id, type);
    if (feature) {
      selectFeature(feature);
      centerTo(id, type);
      showPopup();
    }
  }

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
          scroll={{ x: "max-content", y: 220 }}
          rowClassName={(_, index) =>
            index % 2 ? styles["row1"] : styles["row2"]
          }
          className={styles["table"]}
          sticky
          rowKey={"id"}
          dataSource={cameraList}
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
