import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { Camera } from "@/models/useItems";
import { delCamera, setCameraArchive } from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";
interface IProps {
  flush: () => void;
  data: Camera[];
  loading: boolean;
  edit: (device: number, type: string, extra?: any) => void;
}
export default function (props: IProps) {
  const { edit, data, flush, loading } = props;
  const [mapModal, setMapModal] = useState({
    id: -1,
    type: "",
    isModalOpen: false,
  });
  const setArchive = async (id: number, archived: boolean) => {
    await setCameraArchive(id, archived);
    flush();
  };
  const deleteCamera = async (id: number) => {
    await delCamera(id);
    flush();
  };
  const onClose = () => {
    setMapModal({
      id: -1,
      type: "",
      isModalOpen: false,
    });
  };
  const columns: TableColumnsType<Camera> = [
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
              setMapModal({ id: record.id, type: "camera", isModalOpen: true });
            }}
          >
            查看地图
          </Button>
        );
      },
    },
    {
      title: "Operator",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                edit(record.id, "camera");
              }}
            >
              {"Edit"}
            </Button>
            {record.archived && (
              <Popconfirm
                title="Undo archive the camera"
                description="Are you sure to Undo archive the camera?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button danger size="small">
                  Undo archive
                </Button>
              </Popconfirm>
            )}
            {!record.archived && (
              <Popconfirm
                title="archive the camera"
                description="Are you sure to archive the camera?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  Archive
                </Button>
              </Popconfirm>
            )}
            {record.archived && (
              <Popconfirm
                title="Delete the camera"
                description="Are you sure to delete this camera?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  size="small"
                  onClick={() => {
                    deleteCamera(record.id);
                    flush();
                  }}
                >
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
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data}
        bordered
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
