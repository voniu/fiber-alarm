import { Button, Popconfirm, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import type { Camera } from "@/models/useItems";
import { delCamera, setCameraArchive } from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";
import { useModel } from "umi";
interface IProps {
  isArchived: boolean;
  flush: () => void;
  data: Camera[];
  loading: boolean;
  edit: (device: number, type: string, extra?: any) => void;
}
export default function (props: IProps) {
  const { edit, data, flush, loading, isArchived } = props;
  const { admin } = useModel("useAdminInfo");
  const [mapModal, setMapModal] = useState({
    id: -1,
    type: "",
    isModalOpen: false,
  });
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setCameraArchive(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success("success");
    }
    flush();
  };
  const deleteCamera = async (id: number) => {
    const { success, msg } = await delCamera(id);
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
            Check Map
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
            {isArchived && (
              <Popconfirm
                title="Undo archive the camera"
                description="Are you sure to Undo archive the camera?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Undo archive</Button>
              </Popconfirm>
            )}
            {!isArchived && (
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
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="Delete the camera"
                description="Are you sure to delete this camera?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  deleteCamera(record.id);
                  flush();
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
