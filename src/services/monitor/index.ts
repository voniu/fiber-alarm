import { request } from "@@/plugin-request";
const prefix = "/api/guard";

function locationConverter<T>(item: any): T {
  return { ...item, location: JSON.parse(item.location) };
}
// 主管登陆, 登出
export const monitorLogin = async (username: string, password: string) => {
  const { data } = await request(`${prefix}/login`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
  return data;
};
export const monitorLoginState = async () => {
  const { data } = await request(`${prefix}/loginState`);
  return data;
};

export const monitorLogout = () => {
  return request(`${prefix}/logout`, {
    method: "POST",
  });
};

// 获取保安列表
export const getGuards = async () => {
  const { data } = await request(`${prefix}/guards`);
  return data;
};
export const getDuty = async () => {
  const { data } = await request(`${prefix}/onduty`);
  return data;
};

// 进入值班
export const onDuty = async (guardId: number) => {
  return request(`${prefix}/onduty`, {
    method: "POST",
    data: {
      guardId,
      operation: "START",
    },
  });
};
// 恢复值班
export const resumeDuty = async () => {
  return request(`${prefix}/onduty`, {
    method: "POST",
    data: {
      operation: "RESUME",
    },
  });
};

// 退出值班
export const offDuty = (password: string) => {
  return request(`${prefix}/onduty`, {
    method: "POST",
    data: {
      operator: "STOP",
      password,
    },
  });
};

export const getFiber = (nameKw: string) => {
  return request(`${prefix}/fiber`, {
    params: { nameKw },
  }).then((res) => {
    if (!res.success) return res;
    res.data = res.data.map(locationConverter);
    return res;
  });
};

// 光纤详情
export const getFiberDetail = (id: number) => {
  return request(`${prefix}/fiber/${id}`).then((res) => {
    if (!res.success) return res;
    res.data = locationConverter(res.data);
    return res;
  });
};
// 摄像头
export const getCamera = (nameKw: string) => {
  return request(`${prefix}/camera`, {
    params: {
      nameKw,
    },
  }).then((res) => {
    if (!res.success) return res;
    res.data = res.data.map(locationConverter);
    return res;
  });
};

// 摄像头详情
export const getCameraDetail = (id: number) => {
  return request(`${prefix}/camera/${id}`).then((res) => {
    if (!res.success) return res;
    res.data = locationConverter(res.data);
    return res;
  });
};

export const getAlarmDetail = (id: number) => {
  return request(`${prefix}/alarm/${id}`);
};