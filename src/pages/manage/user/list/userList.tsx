import { User } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType, Typography } from "antd";
import dayjs from "@/utills/day";
import { delUser, updateUser } from "@/services/admin";

interface IProps {
  data: User[];
  flush: () => void;
}
export default (props: IProps) => {
  const { data, flush } = props;
  const identity = ["super admin", "admin", "manager"];
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
            <Popconfirm
              title="reset the password"
              description="Are you sure to reset the password?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteUser(record.id)}
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        rowKey={"id"}
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
};
