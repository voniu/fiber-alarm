import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/test", component: "test" },
  ],
  plugins: ['@umijs/plugins/dist/model', '@umijs/plugins/dist/request'],
  model: {},
  request: {
    dataField: 'data'
  },
  mock: false,
  npmClient: 'pnpm',
});
