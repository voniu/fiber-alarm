import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModel } from "umi";
import type { Camera } from "@/models/useItems";
import { ArrayItemToFixed } from "@/utills";
export default function () {
  const { cameraList } = useModel("useItems");
  const columns: TableColumnsType<Camera> = [
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
      render: (_, record) => <a>{ArrayItemToFixed(record.location, 4)}</a>,
    },
    {
      title: "Operator",
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
        pagination={false}
        columns={columns}
        dataSource={cameraList}
        bordered
      />
    </>
  );
}
