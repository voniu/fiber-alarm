import { ProLayout } from "@ant-design/pro-layout";
import { NavLink, Outlet, useAppData, useLocation, useModel } from "umi";
import MenuHeader from "./HeaderTitle";
import { Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  console.log(clientRoutes, location);
  const { monitor } = useModel("useUserInfo");

  return (
    <ProLayout
      layout="mix"
      route={clientRoutes[5]}
      location={location}
      token={{
        sider: {},
      }}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        size: "small",
        title: monitor!.name,
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
