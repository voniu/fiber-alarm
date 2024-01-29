import { Camera } from "./models/useItems";

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
