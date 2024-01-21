import { defineConfig } from "umi";

const MOCK = process.env.MOCK === "true" ? undefined : false;

export default defineConfig({
  routes: [
    { path: "/login", component: "login", layout: false },
    {
      path: "/",
      component: "index",
      layout: false,
    },
    {
      path: "/manage",
      name: "manage",
      flatMenu: true,
      routes: [
        {
          redirect: "/manage/duty",
          path: "/manage",
        },
        {
          name: "duty manage",
          path: "duty",
          component: "@/pages/manage/duty",
        },
        {
          name: "alarm manage",
          path: "alarm",
          component: "@/pages/manage/alarm",
        },
        {
          name: "defense zone",
          path: "defenseZone",
          component: "@/pages/manage/defenseZone",
        },
        {
          name: "device manage",
          path: "device",
          component: "@/pages/manage/device",
        },
        {
          name: "monitor setting",
          path: "monitor",
          component: "@/pages/manage/monitor",
        },
        {
          name: "fiber sensitivity",
          path: "sensitivity",
          component: "@/pages/manage/sensitivity",
        },
        {
          name: "user manage",
          path: "user",
          component: "@/pages/manage/user",
        },
      ],
    },
    { path: "/test", component: "test" },
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
