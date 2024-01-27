import { Camera } from "./models/useItems";

export interface FiberDetil {
  name: string;
  location: string;
  triggerCameras: Camera[];
}
export interface CameraDetil {
  name: string;
  location: string;
}
export interface User {
  name: string;
  type: number;
  password: string;
}
