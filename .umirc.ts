import { defineConfig } from "umi";

const MOCK = process.env.MOCK === 'true' ? undefined : false;

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
  mock: MOCK,
  npmClient: 'pnpm',
  define: { "process.env": { ...process.env, }, },
});
