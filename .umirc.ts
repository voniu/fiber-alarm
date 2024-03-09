import { defineConfig } from "umi";
const MOCK = process.env.MOCK === "true" ? undefined : false;
const LOCALE = process.env.LOCALE === "AZ" ? "az-AZ" : "en-US";
console.log(LOCALE);

export default defineConfig({
  initialState: {},
  access: {},
  routes: [
    {
      path: "/",
      name: "/",
      component: "@/pages/home/index",
      layout: false,
    },
    {
      path: "/home",
      name: "home",
      component: "@/pages/home/index",
      layout: false,
    },
    {
      path: "/home/login",
      name: "Duty System Login",
      component: "@/pages/home/login",
      layout: false,
    },
    {
      path: "/home/duty",
      name: "Duty Select",
      component: "@/pages/home/duty",
      layout: false,
    },
    // 0 = 超级管理员 1 = 管理员 2 = 主管
    {
      path: "/manage",
      name: "manage",
      flatMenu: true,
      routes: [
        {
          redirect: "/manage/alarm",
          path: "/manage",
        },
        {
          name: "History Alarm",
          path: "alarm",
          access: "alarm",
          component: "@/pages/manage/alarm",
        },
        {
          name: "Current Alarm",
          path: "currentAlarm",
          access: "currentAlarm",
          component: "@/pages/manage/currentAlarm",
        },
        {
          name: "Map Setting",
          path: "defenseZone",
          access: "defenseZone",
          component: "@/pages/manage/defenseZone",
        },
        {
          name: "Device Operation",
          path: "device",
          access: "device",
          component: "@/pages/manage/device",
        },
        {
          name: "Monitor Setting",
          path: "monitor",
          access: "monitor",
          component: "@/pages/manage/monitor",
        },
        {
          name: "Fiber Sensitivity",
          path: "sensitivity",
          access: "sensitivity",
          component: "@/pages/manage/sensitivity",
        },
        {
          name: "Log Information",
          access: "log",
          path: "log",
          component: "@/pages/manage/log",
        },
        {
          name: "User Manage",
          access: "user",
          path: "user",
          component: "@/pages/manage/user",
        },
        {
          name: "Tech Support",
          access: "document",
          path: "document",
          component: "@/pages/manage/document",
        },
      ],
    },
    {
      name: "Duty Manage Login",
      path: "/manage/login",
      component: "@/pages/manage/login",
      layout: false,
    },
    { path: "/*", component: "@/pages/404", layout: false },
  ],
  plugins: [
    "@umijs/plugins/dist/access",
    "@umijs/plugins/dist/initial-state",
    "@umijs/plugins/dist/model",
    "@umijs/plugins/dist/request",
    "@umijs/plugins/dist/locale",
  ],
  model: {},
  request: {
    dataField: "data",
  },
  locale: {
    default: LOCALE,
    baseSeparator: "-",
    baseNavigator: false,
    useLocalStorage: false,
  },
  mock: MOCK,
  npmClient: "pnpm",
  define: { "process.env": { ...process.env } },
});
