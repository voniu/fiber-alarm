import { Guard } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType } from "antd";
import dayjs from "@/utills/day";
import { delGuard, setGuardArchived } from "@/services/admin";

interface IProps {
  data: Guard[];
  flush: () => void;
  loading: boolean;
  isArchived: boolean;
}
export default (props: IProps) => {
  const { data, flush, loading, isArchived } = props;
  const deleteUser = async (id: number) => {
    await delGuard(id);
    flush();
  };
  const setArchive = async (id: number, archived: boolean) => {
    await setGuardArchived(id, archived);
    flush();
  };
  const columns: TableColumnsType<Guard> = [
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
      title: "CreateTime",
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
                title="Undo archive the guard"
                description="Are you sure to Undo archive the guard?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button danger size="small">
                  Undo archive
                </Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title="archive the guard"
                description="Are you sure to archive the user?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  Archive
                </Button>
              </Popconfirm>
            )}
            {isArchived && (
              <Popconfirm
                title="delete the guard"
                description="Are you sure to delete the guard?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteUser(record.id)}
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
        pagination={{ pageSize: 6 }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
};
