export default function (initialState: { type: number }) {
  const { type } = initialState;
  console.log("init", type);

  return {
    alarm: [0, 1, 2].includes(type),
    currentAlarm: [2].includes(type),
    defenseZone: [0, 1, 2].includes(type),
    device: [0, 1].includes(type),
    monitor: [0, 1].includes(type),
    sensitivity: [0, 1].includes(type),
    log: [0, 1].includes(type),
    user: [0, 1].includes(type),
  };
}
