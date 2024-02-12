import { User } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType, Typography } from "antd";
import dayjs from "@/utills/day";
import {
  delUser,
  setUserArchive,
  updateUser,
  updateUserPassword,
} from "@/services/admin";
import { useModel } from "umi";
import { useState } from "react";
import RestPassword from "../restPassword";
interface IProps {
  data: User[];
  flush: () => void;
  loading: boolean;
  isArchived: boolean;
}
export default (props: IProps) => {
  const { data, flush, loading, isArchived } = props;
  const identity = ["super admin", "admin", "manager"];
  const { admin } = useModel("useAdminInfo");
  const [reset, setRest] = useState<{ open: boolean; id: number }>({
    open: false,
    id: -1,
  });
  const deleteUser = async (id: number) => {
    await delUser(id);
    flush();
  };
  const changeNickname = async (val: string, user: User) => {
    await updateUser(user.id, { ...user, nickname: val });
    flush();
  };
  const resetPassword = async (id: number, password: string) => {
    await updateUserPassword(id, password);
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
            {isArchived && (
              <Popconfirm
                title="Undo archive the user"
                description="Are you sure to Undo archive the user?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Undo archive</Button>
              </Popconfirm>
            )}
            {!isArchived && (
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
              <Button
                danger
                size="small"
                onClick={() => setRest({ open: true, id: record.id })}
              >
                Reset Password
              </Button>
            )}
            {isArchived && (
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
        pagination={{ pageSize: 6 }}
        columns={columns}
        dataSource={data}
        bordered
      />
      <RestPassword
        id={reset.id}
        isModalOpen={reset.open}
        reset={resetPassword}
        flush={flush}
        onCancel={() => setRest({ open: false, id: -1 })}
      />
    </>
  );
};
