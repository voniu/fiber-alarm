import { getGuards } from "@/services/monitor";
import WithAuth from "@/wrappers/auth";
import { Table, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useModel, history } from "umi";

interface DataType {
  key: string;
  id: number;
  name: string;
  status: string;
  address: string;
}

const Duty = () => {
  const [data, setData] = useState();
  const { hasGuard, setGuards, unsetGuards } = useModel("useGuards");
  const { currentUser } = useModel("useUserInfo");
  const handleConfirm = async (guardId: number, type: string) => {
    console.log(type, hasGuard);

    if (type === "off") {
      if (hasGuard) {
        message.info("having guard please unset");
        // return;
      }
      await setGuards(guardId);
      history.push("/");
    } else {
      unsetGuards(currentUser.name, currentUser.password);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      className: "column-money",
      dataIndex: "status",
      align: "right",
    },
    {
      title: "Operator",
      render: (_, record) => {
        return record.status === "on" ? (
          "Dutying"
        ) : (
          <Popconfirm
            title="Sure to Confirm?"
            onConfirm={() => handleConfirm(record.id, record.status)}
            okText="Yes"
            cancelText="No"
          >
            {<a style={{ color: "blue" }}>{"Start Duty"}</a>}
          </Popconfirm>
        );
      },
    },
  ];
  useEffect(() => {
    getGuards().then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Duty Manage
      </p>
      <Table pagination={false} columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default WithAuth(Duty);
