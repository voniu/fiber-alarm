import { User } from "@/type";
import {
  Button,
  Popconfirm,
  Table,
  TableColumnsType,
  Typography,
  message,
} from "antd";
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
    const { success, msg } = await delUser(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
    }
    flush();
  };
  const changeNickname = async (val: string, user: User) => {
    const { success, msg } = await updateUser(user.id, {
      ...user,
      nickname: val,
    });
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
    }
    flush();
  };
  const resetPassword = async (id: number, password: string) => {
    const { success, msg } = await updateUserPassword(id, password);
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
    }
  };
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setUserArchive(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
    }
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
      render: (text, record) =>
        record.type !== 0 &&
        record.id !== admin?.id &&
        (admin?.type === 0 || (admin?.type === 1 && record.type === 2)) ? (
          <Typography.Text
            style={{ width: "100px" }}
            editable={{
              onChange: (val) => changeNickname(val, record),
            }}
          >
            {record.nickname}
          </Typography.Text>
        ) : (
          record.nickname
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
            {isArchived &&
              record.type !== 0 &&
              record.id !== admin?.id &&
              (admin?.type === 0 ||
                (admin?.type === 1 && record.type === 2)) && (
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
            {!isArchived &&
              record.id !== admin?.id &&
              (admin?.type === 0 ||
                (admin?.type === 1 && record.type === 2)) && (
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
            {isArchived &&
              record.type !== 0 &&
              record.id !== admin?.id &&
              admin?.type === 0 && (
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
        pagination={{ pageSize: 6, showSizeChanger: false }}
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
