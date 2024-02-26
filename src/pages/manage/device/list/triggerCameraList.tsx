import { useEffect, useState } from "react";
import { delFiberCamera, getFiberDetail } from "@/services/admin";
import { Button, List, Popconfirm, message } from "antd";
import type { Camera } from "@/models/useItems";
interface IProps {
  id: number;
  flush: () => void;
}
export default (props: IProps) => {
  const [list, setList] = useState<Camera[]>();
  const [isChange, setIsChange] = useState(false);
  const { id, flush } = props;
  const dissolve = async (cameraId: number) => {
    const { success, msg } = await delFiberCamera(id, cameraId);
    if (!success) {
      message.error(msg);
    } else {
      message.success("gözləyir");
    }
    setIsChange(!isChange);
    flush();
  };
  useEffect(() => {
    getFiberDetail(id).then((res) => {
      console.log(res);
      setList(res.data.triggerCameras);
    });
  }, [isChange]);
  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                key={"cancel-trigger-camera"}
                title="Kameranı açın"
                description="Kameranı çıxarmaq istədiyinizə əminsiniz?"
                okText="bəli"
                cancelText="xeyr"
                onConfirm={() => dissolve(item.id)}
              >
                <Button type="link" size="small" danger>
                  ayırmaq
                </Button>
              </Popconfirm>,
            ]}
          >
            <div>
              <span>kamera məlumatları</span>
            </div>
            <div>
              <span>{item.id}</span>
            </div>
            <div>
              <span>{item.name}</span>
            </div>
            {/* <div>
              <span>
                {ArrayItemToFixed(JSON.parse(item.location.toString()), 4)}
              </span>
            </div> */}
          </List.Item>
        )}
      />
    </div>
  );
};
