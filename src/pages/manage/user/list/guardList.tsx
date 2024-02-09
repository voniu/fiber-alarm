import { Guard } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType, Typography } from "antd";
import dayjs from "@/utills/day";
import { delGuard, setGuardArchived, updateGuard } from "@/services/admin";

interface IProps {
  data: Guard[];
  flush: () => void;
  loading: boolean;
}
export default (props: IProps) => {
  const { data, flush, loading } = props;
  const deleteUser = async (id: number) => {
    await delGuard(id);
    flush();
  };
  const changeNickname = async (val: string, user: Guard) => {
    await updateGuard(user.id, { ...user, nickname: val });
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
      title: "NickName",
      dataIndex: "nickname",
      width: 200,
      render: (text, record) => (
        <Typography.Text
          style={{ width: "100px" }}
          editable={{
            onChange: (val) => changeNickname(val, record),
          }}
        >
          {record.nickname}
        </Typography.Text>
      ),
    },
    {
      title: "CreateTime",
      dataIndex: "createTime",
      render: (_, record) => (
        <div>{dayjs(record.createTime).format("YYYY/MM/DD")}</div>
      ),
    },
    {
      title: "Rest Password",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: 10 }}>
            {record.archived && (
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
            {!record.archived && (
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
            {record.archived && (
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
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
};
