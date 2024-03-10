import WithAuth from "@/wrappers/authAdmin";
import { useEffect } from "react";
import styles from "./index.less";
import { useModel } from "umi";
import { Button, Collapse, CollapseProps, List } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
const DocumentPage = () => {
  const { TechSupport, ToolDownload, DocumentDownload } =
    useModel("useLocaleText");
  const data1 = [
    {
      text: "test device soft",
      url: "https://baidu.com",
    },
    {
      text: "test device soft",
      url: "https://baidu.com",
    },
    {
      text: "test device soft",
      url: "https://baidu.com",
    },
    {
      text: "test device soft",
      url: "https://baidu.com",
    },
    {
      text: "test device soft",
      url: "https://baidu.com",
    },
  ];
  const data2 = [
    {
      text: "test device soft",
      url: "https://baidu.com",
    },
    {
      text: "test device soft1",
      url: "https://baidu.com",
    },
    {
      text: "test device soft2",
      url: "https://baidu.com",
    },
  ];
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: ToolDownload,
      children: (
        <>
          <List
            header={null}
            bordered
            dataSource={data1}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <a href={item.url} download={item.text}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<DownloadOutlined />}
                      size={"small"}
                    />
                  </a>
                  <span
                    style={{ fontSize: 16, marginLeft: 20, fontWeight: 500 }}
                  >
                    {item.text}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "2",
      label: DocumentDownload,
      children: (
        <>
          <List
            header={null}
            bordered
            dataSource={data2}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <a href={item.url} download={item.text}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<DownloadOutlined />}
                      size={"small"}
                    />
                  </a>
                  <span
                    style={{ fontSize: 16, marginLeft: 20, fontWeight: 500 }}
                  >
                    {item.text}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  useEffect(() => {}, []);

  return (
    <div className={styles["container"]}>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        {TechSupport}
      </p>
      <Collapse size="large" items={items} defaultActiveKey={["1"]} />
    </div>
  );
};
export default WithAuth(DocumentPage);
