import { defineConfig } from "umi";
const MOCK = process.env.MOCK === "true" ? undefined : false;

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
          name: "Tarix Siqnalı",
          path: "alarm",
          access: "alarm",
          component: "@/pages/manage/alarm",
        },
        {
          name: "Cari Siqnalı",
          path: "currentAlarm",
          access: "currentAlarm",
          component: "@/pages/manage/currentAlarm",
        },
        {
          name: "Müdafiə zonası",
          path: "defenseZone",
          access: "defenseZone",
          component: "@/pages/manage/defenseZone",
        },
        {
          name: "Cihaz İdarəetməsi",
          path: "device",
          access: "device",
          component: "@/pages/manage/device",
        },
        {
          name: "Monitor Parametrlər",
          path: "monitor",
          access: "monitor",
          component: "@/pages/manage/monitor",
        },
        {
          name: "Fiber Həssaslığı",
          path: "sensitivity",
          access: "sensitivity",
          component: "@/pages/manage/sensitivity",
        },
        {
          name: "Giriş Məlumatı",
          access: "log",
          path: "log",
          component: "@/pages/manage/log",
        },
        {
          name: "İstifadəçi İdarəetməsi",
          access: "user",
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
  plugins: [
    "@umijs/plugins/dist/access",
    "@umijs/plugins/dist/initial-state",
    "@umijs/plugins/dist/model",
    "@umijs/plugins/dist/request",
  ],
  model: {},
  request: {
    dataField: "data",
  },
  mock: MOCK,
  npmClient: "pnpm",
  define: { "process.env": { ...process.env } },
});
