import { MonitorSetting } from "@/type";
import { request } from "umi";

const prefix = "/api/common";

export const getMatrix = () => {
  return request(`${prefix}/matrix`);
};
export const setMatrix = (matrix: MonitorSetting[]) => {
  return request(`${prefix}/matrix`, { method: "PUT", data: matrix });
};
