import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { Camera } from "@/models/useItems";
import { delCamera } from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";
interface IProps {
  flush: () => void;
  data: Camera[];
  edit: (device: number, type: string) => void;
}
export default function (props: IProps) {
  const { edit, data, flush } = props;
  const [mapModal, setMapModal] = useState({
    id: -1,
    type: "",
    isModalOpen: false,
  });
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
      render: (_, record) => {
        return (
          <div>
            <a style={{ color: "blue", marginRight: 20 }}>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  edit(record.id, "camera");
                }}
              >
                {"Edit"}
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
                  onClick={() => deleteCamera(record.id)}
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
