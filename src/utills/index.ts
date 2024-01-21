export const ArrayItemToFixed = (arr: number[], length: number) => {
  return `[${arr.map((i) => i.toFixed(length)).toString()}]`;
};
