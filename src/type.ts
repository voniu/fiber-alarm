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
  archived: boolean;
  identifier: number[];
}
export interface CameraDetail {
  name: string;
  archived: boolean;
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
  archived: boolean;
}
export interface Guard {
  id: number;
  name: string;
  nickname: string;
  archived: boolean;
  createTime: number;
}

export interface LogInfo {
  id: number;
  detail: string;
}
export interface FiberControl {
  id: number;
  name: string;
  type: number;
  host: string;
  port: number;
  archived: boolean;
  fiberNum?: number;
}
