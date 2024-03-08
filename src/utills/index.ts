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
export const restorePoints = (lines: any) => {
  const points = [lines[0][0]]; // 使用第一条线段的起点作为初始点
  for (const line of lines) {
    const lastPoint = points[points.length - 1];
    const endPointOfLine = line[1];

    // 如果线段的起点与上一个点不同，将其添加到还原的点数组中
    if (
      endPointOfLine[0] !== lastPoint[0] ||
      endPointOfLine[1] !== lastPoint[1]
    ) {
      points.push(endPointOfLine);
    }
  }
  return points;
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
