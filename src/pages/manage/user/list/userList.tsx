import { User } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType, Typography } from "antd";
import dayjs from "@/utills/day";
import { delUser, setUserArchive, updateUser } from "@/services/admin";
import { useModel } from "umi";
interface IProps {
  data: User[];
  flush: () => void;
  loading: boolean;
}
export default (props: IProps) => {
  const { data, flush, loading } = props;
  const identity = ["super admin", "admin", "manager"];
  const { admin } = useModel("useAdminInfo");
  const deleteUser = async (id: number) => {
    await delUser(id);
    flush();
  };
  const changeNickname = async (val: string, user: User) => {
    await updateUser(user.id, { ...user, nickname: val });
    flush();
  };
  const resetPassword = async (user: User) => {
    await updateUser(user.id, { ...user, password: "666666" });
  };
  const setArchive = async (id: number, archived: boolean) => {
    await setUserArchive(id, archived);
    flush();
  };
  const columns: TableColumnsType<User> = [
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
      title: "Identity",
      dataIndex: "type",
      render: (_, record) => <div>{identity[record.type]}</div>,
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
            {record.archived && (
              <Popconfirm
                title="Undo archive the user"
                description="Are you sure to Undo archive the user?"
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
                title="archive the user"
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
            {admin?.type === 0 && (
              <Popconfirm
                title="reset the password"
                description="Are you sure to reset the password?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => resetPassword(record)}
              >
                <Button danger size="small">
                  Reset Password
                </Button>
              </Popconfirm>
            )}
            {record.archived && (
              <Popconfirm
                title="delete the user"
                description="Are you sure to delete the user?"
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
