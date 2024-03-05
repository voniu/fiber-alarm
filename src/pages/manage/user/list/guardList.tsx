import { Guard } from "@/type";
import { Button, Popconfirm, Table, TableColumnsType, message } from "antd";
import dayjs from "@/utills/day";
import { delGuard, setGuardArchived } from "@/services/admin";
import { useModel } from "umi";

interface IProps {
  data: Guard[];
  flush: () => void;
  loading: boolean;
  isArchived: boolean;
}
export default (props: IProps) => {
  const { data, flush, loading, isArchived } = props;
  const { admin } = useModel("useAdminInfo");
  const {
    Delete,
    Success,
    UndoSuspend,
    Suspend,
    Name,
    CreateTime,
    Yes,
    No,
    AreYouSureToSuspend,
    AreYouSureToUndoSuspend,
    AreYouSureToDelete,
  } = useModel("useLocaleText");
  const deleteUser = async (id: number) => {
    const { success, msg } = await delGuard(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
    flush();
  };
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setGuardArchived(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
    flush();
  };
  const columns: TableColumnsType<Guard> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: Name,
      dataIndex: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: CreateTime,
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
                title={UndoSuspend}
                description={`${AreYouSureToUndoSuspend}?`}
                okText={Yes}
                cancelText={No}
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">{UndoSuspend}</Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title={Suspend}
                description={`${AreYouSureToSuspend}`}
                okText={Yes}
                cancelText={No}
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  {Suspend}
                </Button>
              </Popconfirm>
            )}
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title={Delete}
                description={`${AreYouSureToDelete}?`}
                okText={Yes}
                cancelText={No}
                onConfirm={() => deleteUser(record.id)}
              >
                <Button danger size="small">
                  {Delete}
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
        scroll={{ x: true }}
        loading={loading}
        rowKey={"id"}
        pagination={{ pageSize: 6, showSizeChanger: false }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
};
