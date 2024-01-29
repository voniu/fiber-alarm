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
