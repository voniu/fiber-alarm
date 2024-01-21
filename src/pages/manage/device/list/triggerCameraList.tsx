import { useEffect, useState } from "react";
import { getFiberDetail } from "@/services/admin";
import { Button, List, Popconfirm } from "antd";
import type { Camera } from "@/models/useItems";
import { ArrayItemToFixed } from "@/utills";
interface IProps {
  id: number;
}
export default (props: IProps) => {
  const [list, setList] = useState<Camera[]>();
  const { id } = props;
  useEffect(() => {
    getFiberDetail(id).then((res) => {
      console.log(res);
      setList(res.data.triggerCameras);
    });
  }, []);
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
                title="Delete the Fiber"
                description="Are you sure to delete this Fiber?"
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" size="small" danger>
                  Dissolve
                </Button>
              </Popconfirm>,
            ]}
          >
            <div>
              <span>摄像头信息</span>
            </div>
            <div>
              <span>{item.id}</span>
            </div>
            <div>
              <span>{item.name}</span>
            </div>
            <div>
              <span>
                {ArrayItemToFixed(JSON.parse(item.location.toString()), 4)}
              </span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
