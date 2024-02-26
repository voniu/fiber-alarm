import { Button, Popconfirm, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import { delControl, setControlArchive } from "@/services/admin";
import { FiberControl } from "@/type";
import { useModel } from "umi";
import { deviceType } from "@/constant";
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
      message.success("gözləyir");
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
      title: "ad",
      dataIndex: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: "Ev sahibi",
      dataIndex: "host",
      render: (text, record) => <a>{record.host}</a>,
    },
    {
      title: "Port",
      dataIndex: "port",
      render: (text, record) => <a>{record.port}</a>,
    },
    {
      title: "növ",
      dataIndex: "type",
      render: (text, record) => <a>{deviceType[record.type]}</a>,
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
              {"redaktə et"}
            </Button>
            {isArchived && (
              <Popconfirm
                title="Fiber nəzarətini arxivdən çıxarın"
                description="Fiber nəzarətini arxivdən çıxarmağa əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Arxivi ləğv edin</Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title="fiber nəzarətini arxivləşdirin"
                description="Fiber nəzarətini arxivləşdirməyə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  arxiv
                </Button>
              </Popconfirm>
            )}
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="Fiber nəzarətini silin"
                description="Bu Fiber nəzarətini silməyə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={async () => {
                  const { success, msg } = await delControl(record.id);
                  if (!success) {
                    message.error(msg);
                  } else {
                    message.success("gözləyir");
                  }
                  flush();
                }}
              >
                <Button danger size="small">
                  silmək
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
        scroll={{ x: true }}
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
