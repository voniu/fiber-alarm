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
import trumpetOn from "@/assets/trumpet/trumpet_on.png";
import trumpetOff from "@/assets/trumpet/trumpet_off.png";
import Icons from "./menuIcon";
import styles from "./index.less";
export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  console.log(clientRoutes, location);
  const { admin } = useModel("useAdminInfo");
  const { alarmList } = useModel("useAlarms");
  const route = clientRoutes[clientRoutes.length - 1];
  console.log(route);

  return (
    <ProLayout
      layout="mix"
      route={clientRoutes[clientRoutes.length - 1]}
      location={location}
      token={{
        header: {
          colorBgHeader: "#292f33",
          colorHeaderTitle: "#fff",
          colorTextMenu: "#dfdfdf",
          colorTextMenuSecondary: "#dfdfdf",
          colorTextMenuSelected: "#fff",
          colorBgMenuItemSelected: "#22272b",
          colorTextMenuActive: "rgba(255,255,255,0.85)",
          colorTextRightActionsItem: "#dfdfdf",
        },
        colorTextAppListIconHover: "#fff",
        colorTextAppListIcon: "#dfdfdf",
        sider: {
          colorMenuBackground: "#fff",
          colorMenuItemDivider: "#dfdfdf",
          colorBgMenuItemHover: "#f6f6f6",
          colorTextMenu: "#3b3b3b",
          colorTextMenuSelected: "#242424",
          colorTextMenuActive: "#000",
        },
        pageContainer: {
          paddingBlockPageContainerContent: 20,
          paddingInlinePageContainerContent: 20,
        },
      }}
      siderWidth={220}
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
        console.log("dasdsad", menuItemProps.path);

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
              <div style={{ display: "flex", gap: 20, paddingLeft: 10 }}>
                {/* @ts-ignore */}
                {Icons[menuItemProps.path]}
                {defaultDom}
              </div>
            </NavLink>
          );
        }
        return (
          <div style={{ display: "flex", gap: 20, paddingLeft: 10 }}>
            {/* @ts-ignore */}
            {Icons[menuItemProps.path]}
            {defaultDom}
          </div>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
