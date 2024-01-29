import { MonitorSetting } from "@/type";

export const ArrayItemToFixed = (arr: number[], length: number) => {
  console.log(arr);

  return `[${arr.map((i) => i.toFixed(length)).toString()}]`;
};
export const generateLines = (pointsArray: number[][]) => {
  const lines = [];
  for (let i = 0; i < pointsArray.length - 1; i++) {
    const line = [pointsArray[i], pointsArray[i + 1]];
    lines.push(line);
  }
  return lines;
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
