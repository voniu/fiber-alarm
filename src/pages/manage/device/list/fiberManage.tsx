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
      message.success("gözləyir");
    }
    flush();
  };
  const deleteFiber = async (id: number) => {
    const { success, msg } = await delFiber(id);
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
  const columns: TableColumnsType<Fiber> = [
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
              setMapModal({ id: record.id, type: "fiber", isModalOpen: true });
            }}
          >
            Xəritəni yoxlayın
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
              {"redaktə et"}
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setRelation(true, { id: record.id, name: record.name });
              }}
            >
              {"münasibət"}
            </Button>
            {isArchived && (
              <Popconfirm
                title="Arxivi geri qaytarın"
                description="Fiberi arxivdən çıxaracağınıza əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, false)}
              >
                <Button size="small">Arxivi geri</Button>
              </Popconfirm>
            )}
            {!isArchived && (
              <Popconfirm
                title="fiberi arxivləşdir"
                description="Fiberi arxivləşdirməyə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => setArchive(record.id, true)}
              >
                <Button type="primary" size="small">
                  arxivləşdir
                </Button>
              </Popconfirm>
            )}
            {isArchived && admin?.type === 0 && (
              <Popconfirm
                title="Fiberi sil"
                description="Bu Fiberi silməyinizə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => {
                  deleteFiber(record.id);
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
