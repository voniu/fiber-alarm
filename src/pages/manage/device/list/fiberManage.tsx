import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { Fiber } from "@/models/useItems";
import TriggerCameraList from "./triggerCameraList";
import { delFiber } from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";

interface IProps {
  loading: boolean;
  flush: () => void;
  data: Fiber[];
  edit: (device: number, type: string) => void;
  setRelation: (
    isModalOpen: boolean,
    fiber: {
      id: number;
      name: string;
    }
  ) => void;
}
export default function (props: IProps) {
  const { edit, setRelation, data, flush, loading } = props;
  const [mapModal, setMapModal] = useState({
    id: -1,
    type: "",
    isModalOpen: false,
  });
  const deleteFiber = async (id: number) => {
    await delFiber(id);
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
            查看地图
          </Button>
        );
      },
    },
    {
      title: "Operator",
      key: "operator",
      render: (_, record) => {
        return (
          <div>
            <a style={{ color: "blue", marginRight: 20 }}>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  edit(record.id, "fiber");
                }}
              >
                {"Edit"}
              </Button>
            </a>
            <a style={{ color: "blue", marginRight: 20 }}>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setRelation(true, { id: record.id, name: record.name });
                }}
              >
                {"Relation"}
              </Button>
            </a>
            <a style={{ color: "blue" }}>
              <Popconfirm
                title="Delete the Fiber"
                description="Are you sure to delete this Fiber?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  size="small"
                  onClick={() => deleteFiber(record.id)}
                >
                  Delete
                </Button>
              </Popconfirm>
            </a>
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
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data}
        bordered
        expandable={{
          expandedRowRender: (record) => <TriggerCameraList id={record.id} />,
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
