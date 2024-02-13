import { MonitorSetting } from "@/type";

export const ArrayItemToFixed = (arr: number[], length: number) => {
  return arr.map((i) => Number(i.toFixed(length)));
};
export const generateLines = (pointsArray: number[][]) => {
  if (pointsArray.length === 2) return [[...pointsArray]];

  const lines = [];
  for (let i = 0; i < pointsArray.length - 1; i++) {
    const line = [pointsArray[i], pointsArray[i + 1]];
    lines.push(line);
  }
  return lines;
};
export const pointToLocation = (point: number[][]) => {
  console.log(point, generateLines(point));
  return JSON.stringify(generateLines(point));
};
export const matrixData = (obj: any): MonitorSetting[] => {
  const result = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const [row, column] = key.split("-").map(Number);
      const cameraId = obj[key];
      result.push({ row: row + 1, column: column + 1, cameraId });
    }
  }
  return result;
};

export const isHome = () => {
  return location.pathname.includes("home") || location.pathname === "/";
};
