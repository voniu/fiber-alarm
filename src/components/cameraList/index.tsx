//@ts-ignore
// import { ScrollBoard } from "@jiaminghi/data-view-react";
import styles from "./index.less";
import { useModel } from "umi";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import { Camera } from "@/models/useItems";
import Online from "@/components/online";
import { cameraFactory, cameraFormType } from "@/constant";
import { useEffect, useState } from "react";

export default function () {
  const { cameraList, centerTo, fetchGuardItem } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId } = useModel("useMap");
  const { showPopup } = useModel("useModel");
  const [scrollY, setScrollY] = useState(0);

  const { Name, Status, LocationDesc, CameraType, Type } =
    useModel("useLocaleText");
  const flush = async () => {
    await fetchGuardItem();
  };
  useEffect(() => {
    // 获取外层容器的高度
    const updateScrollHeight = () => {
      const containerHeight =
        document.getElementById("home_right_list")?.clientHeight || 900;
      console.log(document.getElementById("home_right_list")?.clientHeight);

      // 设置纵向滚动的高度为外层容器的高度
      setScrollY(containerHeight - 60);
    };
    updateScrollHeight();
    window.addEventListener("resize", updateScrollHeight);
    return () => {
      window.removeEventListener("resize", updateScrollHeight);
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      flush();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  if (!cameraList.length) return <div>No Data</div>;
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
        <span>{<Online online={record.online} color="white" />}</span>
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
          scroll={{ y: scrollY }}
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
