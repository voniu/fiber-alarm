import { Button, Popconfirm, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import type { Camera } from "@/models/useItems";
import { delCamera, setCameraArchive } from "@/services/admin";
import MapModal from "@/components/mapModal";
import { useState } from "react";
import { useModel } from "umi";
import VideoModal from "@/components/map/videoModal";
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
  const [test, setTest] = useState(false);
  const [testID, setTestID] = useState<number>();
  const setArchive = async (id: number, archived: boolean) => {
    const { success, msg } = await setCameraArchive(id, archived);
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
    }
    flush();
  };
  const deleteCamera = async (id: number) => {
    const { success, msg } = await delCamera(id);
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
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
      title: "ad",
      dataIndex: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: "yer",
      dataIndex: "location",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              console.log(record.id);
              setMapModal({ id: record.id, type: "camera", isModalOpen: true });
            }}
          >
            Xəritəni yoxlayın
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
              {"redaktə et"}
            </Button>
            {isArchived && (
              <Popconfirm
                title="Arxivi geri qaytarın"
                description="Kameranın arxivdən çıxaracağınıza əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Arxivi geri</Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title="Kameranın arxivləşdir"
                description=" Kameranın arxivləşdirməyə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  arxiv
                </Button>
              </Popconfirm>
            )}
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setTest(true);
                setTestID(record.id);
              }}
            >
              {"Test"}
            </Button>
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="kamera sil"
                description="Bu kamera nəzarətini silməyə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => {
                  deleteCamera(record.id);
                  flush();
                }}
              >
                <Button danger size="small">
                  silmək
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
      />
      <MapModal
        id={mapModal.id}
        isModalOpen={mapModal.isModalOpen}
        type={mapModal.type}
        onClose={onClose}
      />
      <VideoModal open={test} onCancel={() => setTest(false)} id={testID} />
    </>
  );
}
