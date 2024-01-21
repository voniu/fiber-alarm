import { getUser } from "@/services/admin";
import WithAuth from "@/wrappers/auth";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Popconfirm, Table, TableColumnsType } from "antd";
interface UserDetail {
  id: number;
  name: string;
  type: number;
}
const UserManage = () => {
  const identity = ["super admin", "admin", "manager"];
  const [data, setData] = useState<UserDetail[]>();
  useEffect(() => {
    getUser(0, "").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  const columns: TableColumnsType<UserDetail> = [
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
      title: "Identity",
      dataIndex: "type",
      render: (_, record) => <div>{identity[record.type]}</div>,
    },
    {
      title: "Rest Password",
      render: (_, record) => {
        return (
          <Popconfirm
            title="reset the password"
            description="Are you sure to reset the password?"
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" onClick={() => console.log(record)}>
              Reset
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        User Manage
      </p>
      <div className={styles["main"]}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          bordered
        />
      </div>
    </div>
  );
};

export default WithAuth(UserManage);
