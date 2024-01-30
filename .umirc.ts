import { defineConfig } from "umi";

const MOCK = process.env.MOCK === "true" ? undefined : false;

export default defineConfig({
  routes: [
    {
      path: "/",
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
    {
      path: "/manage",
      name: "manage",
      flatMenu: true,
      routes: [
        {
          redirect: "/manage/currentAlarm",
          path: "/manage",
        },
        {
          name: "Current Alarm",
          path: "currentAlarm",
          component: "@/pages/manage/currentAlarm",
        },
        {
          name: "History Alarm",
          path: "alarm",
          component: "@/pages/manage/alarm",
        },
        {
          name: "Defense Zone",
          path: "defenseZone",
          component: "@/pages/manage/defenseZone",
        },
        {
          name: "Device Manage",
          path: "device",
          component: "@/pages/manage/device",
        },
        {
          name: "Monitor Setting",
          path: "monitor",
          component: "@/pages/manage/monitor",
        },
        {
          name: "Fiber Sensitivity",
          path: "sensitivity",
          component: "@/pages/manage/sensitivity",
        },
        {
          name: "Log Information",
          path: "log",
          component: "@/pages/manage/log",
        },
        {
          name: "User Manage",
          path: "user",
          component: "@/pages/manage/user",
        },
      ],
    },
    {
      name: "Duty Manage Login",
      path: "/manage/login",
      component: "@/pages/manage/login",
      layout: false,
    },
    // { path: "/test", component: "test" },
    { path: "/*", component: "@/pages/404", layout: false },
  ],
  plugins: ["@umijs/plugins/dist/model", "@umijs/plugins/dist/request"],
  model: {},
  request: {
    dataField: "data",
  },
  mock: MOCK,
  npmClient: "pnpm",
  define: { "process.env": { ...process.env } },
});
