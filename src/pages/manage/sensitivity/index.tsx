import WithAuth from "@/wrappers/authAdmin";
import styles from "./index.less";
import { Button, Col, Empty, List, Popconfirm, Row, message } from "antd";
import CreateTask from "./createTask";
import { useEffect, useState } from "react";
import { delTask, getTask } from "@/services/admin";
const rendertTskItem = (props: {
  // fibers: Fiber[];
  time: { hour: number; minute: number };
  name: string;
  // level: number;
}) => {
  const { time, name } = props;
  // const getFibersName = (fibers: Fiber[]) => {
  //   return fibers
  //     .map((item) => {
  //       return item.name;
  //     })
  //     .join("/");
  // };
  return (
    <div className={styles["list-item"]}>
      <Row>
        <Col span={4}>
          <span className={styles["item-label"]}>ad:</span>
        </Col>
        <Col span={20}>
          <span className={styles["item-content"]}>{name}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <span className={styles["item-label"]}>vaxt:</span>
        </Col>
        <Col span={20}>
          <span className={styles["item-content"]}>{`${time.hour
            .toString()
            .padStart(2, "0")}:${time.minute
            .toString()
            .padStart(2, "0")}`}</span>
        </Col>
      </Row>
      <Row>
        {/* <Col span={3}>
          <span className={styles["item-label"]}>Fibers:</span>
        </Col>
        <Col span={12}>
          <Typography.Text
            ellipsis={{ tooltip: true }}
            className={styles["item-content"]}
          >
            {getFibersName(fibers)}
          </Typography.Text>
          <span className={styles["item-content"]}></span>
        </Col> */}
      </Row>
    </div>
  );
};
const FiberSensitivity = () => {
  const [open, setIsOpen] = useState(false);
  const [check, setCheck] = useState<{
    type: string;
    taskId: number | null;
  }>({ type: "Create", taskId: null });
  const onCancel = () => setIsOpen(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  const fetchTask = async () => {
    setListLoading(true);
    const { data } = await getTask();
    console.log(data);
    setListLoading(false);
    setTasks(data);
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    const { success, msg } = await delTask(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
    }
    setLoading(false);
    fetchTask();
  };
  const handleCheck = (id: number) => {
    setCheck({ type: "Check", taskId: id });
    setIsOpen(true);
  };
  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Fiber Həssaslığı
      </p>
      <div className={styles["container"]}>
        <div className={styles["list-container"]}>
          <div className={styles["create-con"]}>
            <Button
              type="primary"
              onClick={() => {
                setIsOpen(true);
                setCheck({
                  type: "Create",
                  taskId: null,
                });
              }}
            >
              yarat
            </Button>
          </div>
          <div className={styles["list"]}>
            <List
              loading={listLoading}
              className={styles["list-antd"]}
              style={{
                padding: "10px 30px",
                border: "1px solid #fff",
                borderRadius: "10px",
                backgroundColor: "#fff",
                height: 500,
                display: "flex",
                flexDirection: "column",
              }}
              header={
                <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
                  Tapşırıq siyahısı
                </p>
              }
              pagination={{ pageSize: 3, showSizeChanger: false }}
              dataSource={tasks}
              renderItem={(item: any) =>
                tasks.length === 0 ? (
                  <Empty description={"No Task"} />
                ) : (
                  <List.Item
                    actions={[
                      <Button
                        key="check-task"
                        type="primary"
                        onClick={() => handleCheck(item.id)}
                      >
                        yoxla
                      </Button>,
                      <Popconfirm
                        key="delete-task"
                        title={"Tapşırığı silin?"}
                        okText="bəli"
                        cancelText="xeyr"
                        onConfirm={() => handleDelete(item.id)}
                      >
                        <Button danger loading={loading}>
                          sil
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    {rendertTskItem({
                      name: item.name,
                      time: {
                        hour: item.hour,
                        minute: item.minute,
                      },
                    })}
                  </List.Item>
                )
              }
            />
          </div>
        </div>
      </div>
      <CreateTask
        check={check}
        isModalOpen={open}
        onCancel={onCancel}
        fetchTask={fetchTask}
      />
    </div>
  );
};

export default WithAuth(FiberSensitivity);
