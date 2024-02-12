import { MonitorSetting } from "@/type";
import { request } from "umi";

const prefix = "/api/common";

export const getMatrix = () => {
  return request(`${prefix}/matrix`);
};
export const setMatrix = (matrix: MonitorSetting[]) => {
  return request(`${prefix}/matrix`, { method: "PUT", data: matrix });
};

export const getUiConfig = () => {
  return request(`${prefix}/uiConfig`);
};
export const setUiConfig = (config: {
  mapScale: number;
  mapCenter: number[];
}) => {
  return request(`${prefix}/uiConfig`, { method: "PUT", data: config });
};
