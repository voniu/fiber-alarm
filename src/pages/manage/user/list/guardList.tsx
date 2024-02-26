import { Guard } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType, message } from "antd";
import dayjs from "@/utills/day";
import { delGuard, setGuardArchived } from "@/services/admin";
import { useModel } from "umi";

interface IProps {
  data: Guard[];
  flush: () => void;
  loading: boolean;
  isArchived: boolean;
}
export default (props: IProps) => {
  const { data, flush, loading, isArchived } = props;
  const { admin } = useModel("useAdminInfo");
  const deleteUser = async (id: number) => {
    const { success, msg } = await delGuard(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
    }
    flush();
  };
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setGuardArchived(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
    }
    flush();
  };
  const columns: TableColumnsType<Guard> = [
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
      title: "yaratma tarixi",
      dataIndex: "createTime",
      render: (_, record) => (
        <div>{dayjs(record.createTime).format("YYYY/MM/DD")}</div>
      ),
    },
    {
      title: "Operator",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: 10 }}>
            {isArchived && (
              <Popconfirm
                title="Arxivi geri qaytarın"
                description="arxivdən çıxaracağınıza əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Arxivi geri</Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title="arxivləşdir"
                description="arxivləşdirməyə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  arxivləşdir
                </Button>
              </Popconfirm>
            )}
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="sil"
                description="silməyinizə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => deleteUser(record.id)}
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
        pagination={{ pageSize: 6, showSizeChanger: false }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
};
