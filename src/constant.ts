export const CAMERA = "camera";
export const FIBER = "fiber";
export const baseUrl = "";
export const wsUrl = `ws://${document.location.host}`;
export const mapUrl = `${
  process.env.MOCK === "true"
    ? "http://fiber.natapp1.cc"
    : document.location.origin
}/maptile/{z}/{x}/{y}.jpg`;
export const deviceType = ["DD-L-F2", "DD-J-S2A"];
export const cameraFormType = ["IPC", "PTZ"];
export const cameraFactory = ["Hikvision", "Jingyang"];
