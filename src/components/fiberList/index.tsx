//@ts-ignore
// import { ScrollBoard } from "@jiaminghi/data-view-react";
import styles from "./index.less";
import { useModel } from "umi";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import { Fiber } from "@/models/useItems";
import Online from "@/components/online";
import { useEffect, useState } from "react";

export default function () {
  const { fiberList, centerTo, fetchGuardItem } = useModel("useItems");
  const { selectFeature, getFeaturesByTypeAndId, highLightTrigger } =
    useModel("useMap");
  const { showPopup } = useModel("useModel");
  const { Name, LocationDesc, LayingText, LengthText, Status } =
    useModel("useLocaleText");
  const [scrollY, setScrollY] = useState(0);

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
