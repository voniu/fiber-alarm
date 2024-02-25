import { ProLayout } from "@ant-design/pro-layout";
import {
  NavLink,
  Outlet,
  useAppData,
  useLocation,
  useModel,
  history,
  useAccess,
} from "umi";
import MenuHeader from "./HeaderTitle";
import { Badge, Dropdown, Popover } from "antd";
import { LogoutOutlined, KeyOutlined } from "@ant-design/icons";
import trumpetOn from "@/assets/trumpet/trumpet_on.png";
import trumpetOff from "@/assets/trumpet/trumpet_off.png";
import Icons from "./menuIcon";
import styles from "./index.less";
import ChangeModal from "./changeModal";
import { useState } from "react";
import WithAuth from "@/wrappers/authAdmin";
import AuthError from "./AuthError";
const Layout = () => {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  const { admin, logout } = useModel("useAdminInfo");
  const { manageAlarm } = useModel("useAlarms");
  const access = useAccess();
  const [open, setIsOpen] = useState(false);
  const handleClick = async (e: any) => {
    if (e.key === "change password") {
      setIsOpen(true);
    } else if (e.key === "logout") {
      await logout();
      history.push("/manage/login");
    }
  };
  return (
    <ProLayout
      disableMobile
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
      actionsRender={() => {
        if (admin?.type !== 2) return [];
        return [
          <Popover
            key={"d"}
            placement="left"
            content={`There are ${manageAlarm.length} pending alarms`}
          >
            <Badge
              count={manageAlarm.length}
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
                {manageAlarm.length > 0 && <img src={trumpetOn} />}
                {manageAlarm.length <= 0 && <img src={trumpetOff} />}
              </div>
            </Badge>
          </Popover>,
        ];
      }}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        size: "small",
        title: admin?.name,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "çıxış",
                  },
                  {
                    key: "change password",
                    icon: <KeyOutlined />,
                    label: "Change Password",
                  },
                ],
                onClick: handleClick,
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      headerTitleRender={MenuHeader}
      menuDataRender={(menuData) => {
        const F = menuData.map((item: any) => {
          //@ts-ignore
          if (!access[item.access]) {
            return null;
          }
          return item;
        });
        return F.filter((item) => item !== null);
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
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
      <AuthError>
        <Outlet />
      </AuthError>

      <ChangeModal open={open} onCancel={() => setIsOpen(false)} />
    </ProLayout>
  );
};

export default WithAuth(Layout);
