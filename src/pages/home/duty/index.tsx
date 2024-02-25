import { getDuty, getGuards } from "@/services/monitor";
import WithAuth from "@/wrappers/authDuty";
import { Table, Popconfirm, ConfigProvider, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useModel, history } from "umi";
import styles from "./index.less";
interface DutyState {
  isAnyoneOnDuty: boolean; // 是否有主管处于值班状态，true 才有下面
  isSelfOnDuty: boolean; // 当前登录的主管是否处于值班状态
  manager: {
    id: number;
    name: string;
  };
  guard: {
    // 当前值班的保安
    id: number;
    name: string;
  };
}
interface DataType {
  key: string;
  id: number;
  name: string;
  status: string;
  address: string;
}

const Duty = () => {
  const [data, setData] = useState();
  const [dutyState, setDutyState] = useState<DutyState>();
  const [loading, setLoading] = useState(true);
  const { setGuards, resumeGuards, logout } = useModel("useUserInfo");
  const [outLoading, setOutLoading] = useState(false);
  const handleConfirm = async (guardId: number) => {
    const { success, msg } = await setGuards(guardId);
    if (!success) {
      message.info(msg);
      return;
    }
    history.push("/home");
  };
  const handleResume = async () => {
    setOutLoading(true);
    await resumeGuards();
    setOutLoading(false);

    history.push("/home");
  };
  const handleLogout = async () => {
    setOutLoading(true);
    const { success, msg } = await logout();
    setOutLoading(false);

    if (!success) {
      message.info(msg);
      return;
    }
    history.push("/home/login");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getDuty().then((res) => {
        setDutyState(res);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setLoading(true);
    getGuards().then((res) => {
      setLoading(false);
      console.log(res);
      setData(res);
    });
    getDuty().then((res) => {
      setDutyState(res);
    });
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: "ad",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Operator",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Mütləq təsdiq?"
            onConfirm={() => handleConfirm(record.id)}
            okText="bəli"
            cancelText="xeyr"
          >
            {
              <a style={{ color: "black", fontWeight: "bold" }}>
                {"vəzifəyə başlamaq"}
              </a>
            }
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <p
          style={{
            fontSize: 20,
            fontWeight: "bold",
            height: 20,
            color: "#fff",
          }}
        >
          vəzifə idarəetməsi
        </p>
        <div
          className={styles["logout-btn"]}
          onClick={handleLogout}
          style={{ pointerEvents: `${outLoading ? "none" : "auto"}` }}
        >
          {outLoading ? "çıxış.." : "çıxış"}
        </div>
        {!dutyState?.isAnyoneOnDuty && (
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 2,
              },
              components: {
                Table: {
                  headerColor: "#186baf",
                  headerBg: "rgba(32, 163, 245, 0.1)",
                  borderColor: "#2684d1",
                  rowHoverBg: "#186baf",
                },
              },
            }}
          >
            <Table
              loading={loading}
              rowKey={"id"}
              rowClassName={() => {
                return styles["row-bg"];
              }}
              pagination={false}
              columns={columns}
              dataSource={data}
              bordered
              scroll={{ x: "max-content", y: 400 }}
              sticky
            />
          </ConfigProvider>
        )}
        {dutyState?.isAnyoneOnDuty && dutyState.isSelfOnDuty && (
          <div className={styles["hint-content"]}>
            <p>
              Təyin etdiyiniz mühafizə hazırda növbətçidir, vəzifəyə davam etmək
              üçün klikləyin.
            </p>
            <div style={{ color: "#699ef8", marginBottom: 10 }}>
              <div>Cari Mühafizə: {dutyState.guard.name}</div>
            </div>
            <div
              className={styles["resume-btn"]}
              onClick={handleResume}
              style={{ pointerEvents: `${outLoading ? "none" : "auto"}` }}
            >
              {outLoading ? <span>Xülasə..</span> : <span>Xülasə</span>}
            </div>
          </div>
        )}
        {dutyState?.isAnyoneOnDuty && !dutyState.isSelfOnDuty && (
          <div className={styles["hint-content"]}>
            <p>
              Hazırda vəzifədə başqa nəzarətçi var, zəhmət olmasa nəzarətçi ilə
              əlaqə saxlayın.
            </p>
            <div style={{ color: "#699ef8" }}>
              <div>Cari menecer: {dutyState.manager.name}</div>
              <div>Cari Mühafizə: {dutyState.guard.name}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithAuth(Duty);
