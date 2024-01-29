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
export interface User {
  name: string;
  type: number;
  password: string;
}
