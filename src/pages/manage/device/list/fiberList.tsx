import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { delControl, setControlArchive } from "@/services/admin";
import { FiberControl } from "@/type";
interface IProps {
  flush: () => void;
  data: FiberControl[];
  edit: (device: number, type: string, extra?: any) => void;
  loading: boolean;
}
export default function (props: IProps) {
  const { edit, data, flush, loading } = props;
  const setArchive = async (id: number, archived: boolean) => {
    await setControlArchive(id, archived);
    flush();
  };
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
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                edit(record.id, "fiber-control", record);
              }}
            >
              {"Edit"}
            </Button>
            {record.archived && (
              <Popconfirm
                title="Undo archive the fiber control"
                description="Are you sure to Undo archive the fiber control?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button danger size="small">
                  Undo archive
                </Button>
              </Popconfirm>
            )}
            {!record.archived && (
              <Popconfirm
                title="archive the fiber control"
                description="Are you sure to archive the fiber control?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  Archive
                </Button>
              </Popconfirm>
            )}
            {record.archived && (
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
            )}
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
