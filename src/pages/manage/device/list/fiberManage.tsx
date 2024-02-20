import { Button, Popconfirm, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import type { Fiber } from "@/models/useItems";
import TriggerCameraList from "./triggerCameraList";
import { delFiber, setFiberArchive } from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";
import { useModel } from "umi";

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
      message.success("success");
    }
    flush();
  };
  const deleteFiber = async (id: number) => {
    const { success, msg } = await delFiber(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
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
      title: "Location",
      dataIndex: "location",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              console.log(record.id);
              setMapModal({ id: record.id, type: "fiber", isModalOpen: true });
            }}
          >
            Check Map
          </Button>
        );
      },
    },
    {
      title: "Operator",
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
              {"Edit"}
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setRelation(true, { id: record.id, name: record.name });
              }}
            >
              {"Relation"}
            </Button>
            {isArchived && (
              <Popconfirm
                title="Undo archive the fiber"
                description="Are you sure to Undo archive the fiber?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Undo archive</Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title="archive the fiber"
                description="Are you sure to archive the fiber?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  Archive
                </Button>
              </Popconfirm>
            )}
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="Delete the Fiber"
                description="Are you sure to delete this Fiber?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  deleteFiber(record.id);
                }}
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
