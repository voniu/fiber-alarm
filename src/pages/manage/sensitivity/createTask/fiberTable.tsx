import { useEffect, useState } from "react";
import { Table, message } from "antd";
import type { TableColumnsType } from "antd";
import { Fiber } from "@/models/useItems";
import { getFiber } from "@/services/admin";
const columns: TableColumnsType<Fiber> = [
  {
    title: "ID",
    dataIndex: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "ad",
    dataIndex: "name",
    render: (text, record) => <a>{record.name}</a>,
  },
  {
    title: "cihaz",
    dataIndex: "device",
    render: (text, record) => <a>{record.device.name}</a>,
  },
];
interface IProps {
  setSelectFiber: (fibers: any) => void;
}

export default (props: IProps) => {
  const [data, setData] = useState([]);
  const { setSelectFiber } = props;
  const [loading, setLoading] = useState(false);
  const getFiberData = async () => {
    setLoading(true);
    const { success, msg, data: allFiber } = await getFiber("", false);
    if (!success) {
      message.error(msg);
    }
    console.log(allFiber);

    setLoading(false);
    setData(allFiber);
  };
  useEffect(() => {
    getFiberData();
  }, []);
  return (
    <div>
      <Table
        size="small"
        rowKey={"id"}
        loading={loading}
        scroll={{ x: "max-content", y: 150 }}
        sticky
        pagination={false}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys: React.Key[], selectedRows: Fiber[]) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
            const fibers = selectedRows.map((item) => {
              return {
                id: item.id,
                type: item.device.type,
              };
            });
            setSelectFiber(fibers);
          },
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
