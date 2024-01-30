import { Camera } from "./models/useItems";

export interface MonitorSetting {
  row: number;
  column: number;
  cameraId: number;
}
export interface FiberDetail {
  name: string;
  location: string;
  triggerCameras: Camera[];
}
export interface CameraDetail {
  name: string;
  location: string;
}
export interface UserDetail {
  id: number;
  name: string;
  type: number;
  password: string;
}
export interface User {
  id: number;
  name: string;
  nickname: string;
  type: number;
  createTime: number;
  password: string;
}
export interface Guard {
  id: number;
  name: string;
  nickname: string;
  createTime: number;
}
