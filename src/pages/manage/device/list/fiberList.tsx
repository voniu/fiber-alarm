import { Button, Popconfirm, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import { delControl, setControlArchive } from "@/services/admin";
import { FiberControl } from "@/type";
import { useModel } from "umi";
interface IProps {
  isArchived: boolean;
  flush: () => void;
  data: FiberControl[];
  edit: (device: number, type: string, extra?: any) => void;
  loading: boolean;
}
export default function (props: IProps) {
  const { edit, data, flush, loading, isArchived } = props;
  const { admin } = useModel("useAdminInfo");
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setControlArchive(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
    }
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
      render: (text, record) => (
        <a>{record.type === 0 ? "Lanstar-TZ02" : "Jinganneng-S2"}</a>
      ),
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
            {isArchived && (
              <Popconfirm
                title="Undo archive the fiber control"
                description="Are you sure to Undo archive the fiber control?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Undo archive</Button>
              </Popconfirm>
            )}
            {!isArchived && (
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
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="Delete the Fiber"
                description="Are you sure to delete this Fiber?"
                okText="Yes"
                cancelText="No"
                onConfirm={async () => {
                  const { success, msg } = await delControl(record.id);
                  if (!success) {
                    message.error(msg);
                  } else {
                    message.success("success");
                  }
                  flush();
                }}
              >
                <Button danger size="small">
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
        pagination={{ pageSize: 7, showSizeChanger: false }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
}
