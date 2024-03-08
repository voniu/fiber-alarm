import { Button, Popconfirm, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import type { Fiber } from "@/models/useItems";
import TriggerCameraList from "./triggerCameraList";
import {
  armFiber,
  delFiber,
  disarmFiber,
  setFiberArchive,
} from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";
import { useModel } from "umi";
import Online from "@/components/online";

interface IProps {
  isArchived: boolean;
  loading: boolean;
  flush: () => void;
  data: Fiber[];
  edit: (device: number, type: string, extra?: any) => void;
  setRelation: (
    isModalOpen: boolean,
    fiber: {
      id: number;
      name: string;
    }
  ) => void;
}
export default function (props: IProps) {
  const { edit, setRelation, data, flush, loading, isArchived } = props;
  const { admin } = useModel("useAdminInfo");
  const {
    Success,
    Name,
    Location,
    CheckMap,
    Operator,
    Edit,
    Suspend,
    UndoSuspend,
    Delete,
    Relation,
    Yes,
    No,
    AreYouSureToSuspend,
    AreYouSureToUndoSuspend,
    AreYouSureToDelete,
    Status,
    LocationDesc,
    LayingText,
    LengthText,
    Arm,
    Disarm,
  } = useModel("useLocaleText");
  const [mapModal, setMapModal] = useState({
    id: -1,
    type: "",
    isModalOpen: false,
  });
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setFiberArchive(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
    flush();
  };
  const handleArm = async (id: number) => {
    const { success, msg } = await armFiber(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
  };
  const handleDisarm = async (id: number) => {
    const { success, msg } = await disarmFiber(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
  };
  const deleteFiber = async (id: number) => {
    const { success, msg } = await delFiber(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success(Success);
    }
    flush();
  };
  const onClose = () => {
    setMapModal({
      id: -1,
      type: "",
      isModalOpen: false,
    });
  };
  const columns: TableColumnsType<Fiber> = [
    {
      title: Name,
      dataIndex: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: Status,
      dataIndex: "online",
      render: (text, record) => (
        <span>{<Online online={record.online} color="black" />}</span>
      ),
    },
    {
      title: LocationDesc,
      dataIndex: "locationDesc",
      render: (text, record) => <span>{record.locationDesc}</span>,
    },
    {
      title: LayingText,
      dataIndex: "layingMethod",
      render: (text, record) => <span>{record.layingMethod}</span>,
    },
    {
      title: LengthText,
      dataIndex: "length",
      render: (text, record) => <span>{record.length}</span>,
    },
    {
      title: Location,
      dataIndex: "location",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              console.log(record.id);
              setMapModal({ id: record.id, type: "fiber", isModalOpen: true });
            }}
          >
            {CheckMap}
          </Button>
        );
      },
    },
    {
      title: Operator,
      key: "operator",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                edit(record.id, "fiber");
              }}
            >
              {Edit}
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setRelation(true, { id: record.id, name: record.name });
              }}
            >
              {Relation}
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                handleArm(record.id);
              }}
            >
              {Arm}
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                handleDisarm(record.id);
              }}
            >
              {Disarm}
            </Button>
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
                onConfirm={() => {
                  deleteFiber(record.id);
                }}
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
        pagination={{ pageSize: 7, showSizeChanger: false }}
        columns={columns}
        dataSource={data}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <TriggerCameraList id={record.id} flush={flush} />
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
      <MapModal
        id={mapModal.id}
        isModalOpen={mapModal.isModalOpen}
        type={mapModal.type}
        onClose={onClose}
      />
    </>
  );
}
