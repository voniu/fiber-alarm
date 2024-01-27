import { ProLayout } from "@ant-design/pro-layout";
import {
  NavLink,
  Outlet,
  useAppData,
  useLocation,
  useModel,
  history,
} from "umi";
import MenuHeader from "./HeaderTitle";
import { Badge, Dropdown, Popover } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import trumpetOn from "@/assets/trumpet/trumpet-on.png";
import trumpetOff from "@/assets/trumpet/trumpet-off.png";
import styles from "./index.less";
export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  console.log(clientRoutes, location);
  const { admin } = useModel("useAdminInfo");
  const { alarmList } = useModel("useAlarms");
  return (
    <ProLayout
      layout="mix"
      route={clientRoutes[clientRoutes.length - 1]}
      location={location}
      token={{
        sider: {},
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        if (typeof window === "undefined") return [];
        return [
          <Popover
            key={"d"}
            placement="left"
            content={`There are ${alarmList.length} pending alarms`}
          >
            <Badge
              count={alarmList.length}
              offset={[-5, 10]}
              size="small"
              key={"trumpet"}
            >
              <div
                onClick={() => {
                  history.push("/manage/currentAlarm");
                }}
                className={styles["trumpet"]}
              >
                {alarmList.length > 0 && <img src={trumpetOn} />}
                {alarmList.length <= 0 && <img src={trumpetOff} />}
              </div>
              {/* <div
              style={{ position: "absolute", left: 0, top: "100%", width: 100 }}
            >
              <span>There are five pending alarms</span>
            </div> */}
            </Badge>
          </Popover>,
        ];
      }}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        size: "small",
        title: admin!.name,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      headerTitleRender={MenuHeader}
      menuItemRender={(menuItemProps, defaultDom) => {
        console.log("dasdsad");

        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            <NavLink
              style={{ textDecoration: "none" }}
              to={menuItemProps.path}
              target={menuItemProps.target}
            >
              {defaultDom}
            </NavLink>
          );
        }
        return defaultDom;
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
