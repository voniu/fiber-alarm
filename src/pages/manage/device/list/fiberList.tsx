import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { delControl } from "@/services/admin";
import { FiberControl } from "@/type";
interface IProps {
  flush: () => void;
  data: FiberControl[];
  edit: (device: number, type: string, extra?: any) => void;
  loading: boolean;
}
export default function (props: IProps) {
  const { edit, data, flush, loading } = props;
  const columns: TableColumnsType<FiberControl> = [
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
      title: "Host",
      dataIndex: "host",
      render: (text, record) => <a>{record.host}</a>,
    },
    {
      title: "Port",
      dataIndex: "port",
      render: (text, record) => <a>{record.port}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => <a>{record.name}</a>,
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
                  edit(record.id, "fiber-control", record);
                }}
              >
                {"Edit"}
              </Button>
            </a>
            <a style={{ color: "blue" }}>
              <Popconfirm
                title="Delete the Fiber"
                description="Are you sure to delete this Fiber?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  size="small"
                  onClick={() => {
                    delControl(record.id);
                    flush();
                  }}
                >
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
        loading={loading}
        rowKey={"id"}
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
}
