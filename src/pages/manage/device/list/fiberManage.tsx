import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModel } from "umi";
import type { Fiber } from "@/models/useItems";
import { ArrayItemToFixed } from "@/utills";
import TriggerCameraList from "./triggerCameraList";

export default function () {
  const { fiberList } = useModel("useItems");
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
    {
      title: "Location",
      dataIndex: "location",
      render: (_, record) => (
        <a>
          {ArrayItemToFixed(record.location[0][0], 4) +
            "," +
            ArrayItemToFixed(record.location[record.location.length - 1][1], 4)}
        </a>
      ),
    },
    {
      title: "Operator",
      key: "operator",
      render: (_, record) => {
        return (
          <div>
            <a style={{ color: "blue", marginRight: 20 }}>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  console.log(record);
                }}
              >
                {"Deatil"}
              </Button>
            </a>
            <a style={{ color: "blue" }}>
              <Popconfirm
                title="Delete the Fiber"
                description="Are you sure to delete this Fiber?"
                okText="Yes"
                cancelText="No"
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        rowKey={"id"}
        pagination={false}
        columns={columns}
        dataSource={fiberList}
        bordered
        expandable={{
          expandedRowRender: (record) => <TriggerCameraList id={record.id}/>,
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </>
  );
}
