import WithAuth from "@/wrappers/authAdmin";
import styles from "./index.less";
import { Button, Col, Empty, List, Popconfirm, Row, Typography } from "antd";
import { Fiber } from "@/models/useItems";
import CreateTask from "./createTask";
import { useEffect, useState } from "react";
import { delTask, getTask } from "@/services/admin";
const rendertTskItem = (props: {
  fibers: Fiber[];
  time: { hour: number; minute: number };
  level: number;
}) => {
  const { fibers, time, level } = props;
  const getFibersName = (fibers: Fiber[]) => {
    return fibers
      .map((item) => {
        return item.name;
      })
      .join("/");
  };
  return (
    <div className={styles["list-item"]}>
      <Row>
        <Col span={3}>
          <span className={styles["item-label"]}>Time:</span>
        </Col>
        <Col span={12}>
          <span
            className={styles["item-content"]}
          >{`${time.hour}:${time.minute}`}</span>
        </Col>
      </Row>
      <Row>
        <Col span={3}>
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
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <span className={styles["item-label"]}>Level:</span>
        </Col>
        <Col span={12}>
          <span className={styles["item-content"]}>{level}</span>
        </Col>
      </Row>
    </div>
  );
};
const FiberSensitivity = () => {
  const [open, setIsOpen] = useState(false);
  const onCancel = () => setIsOpen(false);
  const [tasks, setTasks] = useState([]);
  const fetchTask = async () => {
    const { data } = await getTask();
    console.log(data);

    setTasks(data);
  };
  const handleDelete = async (id: number) => {
    await delTask(id);
    fetchTask();
  };
  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        Fiber Sensitivity
      </p>
      <div className={styles["container"]}>
        <div className={styles["list-container"]}>
          <div className={styles["create-con"]}>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              Create
            </Button>
          </div>
          <div className={styles["list"]}>
            <List
              style={{
                padding: "10px 30px",
                width: 700,
                border: "1px solid #fff",
                borderRadius: "10px",
                backgroundColor: "#fff",
                height: 500,
                display: "flex",
                flexDirection: "column",
              }}
              header={
                <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
                  Task List
                </p>
              }
              pagination={{ pageSize: 3 }}
              dataSource={tasks}
              renderItem={(item: any) =>
                tasks.length === 0 ? (
                  <Empty description={"No Task"} />
                ) : (
                  <List.Item
                    actions={[
                      <Popconfirm
                        key="delete-task"
                        title={"Delete the task?"}
                        onConfirm={() => handleDelete(item.id)}
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>,
                    ]}
                  >
                    {rendertTskItem({
                      time: {
                        hour: item.hour,
                        minute: item.minute,
                      },
                      fibers: item.fibers,
                      level: item.level,
                    })}
                  </List.Item>
                )
              }
            />
          </div>
        </div>
      </div>
      <CreateTask
        isModalOpen={open}
        onCancel={onCancel}
        fetchTask={fetchTask}
      />
    </div>
  );
};

export default WithAuth(FiberSensitivity);
